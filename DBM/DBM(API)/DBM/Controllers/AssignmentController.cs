using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DBM.Models;
using DBM.ViewModels;
using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Hosting;

using System.IO;
using System.Net.Http.Headers;
using Microsoft.Extensions.FileProviders;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {

        private IHostingEnvironment _hostingEnvironment;
        public AssignmentController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: api/Assignment

        [HttpGet("{CourseId}")]
        public IEnumerable<AssignmentsViewModel> Get(int CourseId)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            List<AssignmentsViewModel> lst = new List<AssignmentsViewModel>();
            foreach(Assignments s in db.Assignments)
            {
                if (s.CourseId == CourseId)
                {
                    AssignmentsViewModel a = new AssignmentsViewModel();
                    a.Id = s.Id;
                    a.Title = s.Title;
                    a.CreatedBy = db.Users.Where(b => b.Id == s.CreatedBy).FirstOrDefault().FirstName + " " + db.Users.Where(b => b.Id == s.CreatedBy).FirstOrDefault().LastName;
                    a.UpdatedBy = db.Users.Where(b => b.Id == s.UpdatedBy).FirstOrDefault().FirstName + " " + db.Users.Where(b => b.Id == s.UpdatedBy).FirstOrDefault().LastName;
                    var d = s.SubmissionDateTime.ToString("yyyy-M-dd hh:mm");
                    //DateTime d1 = new DateTime(d);
                    a.SubmissionDate = s.SubmissionDateTime;
                    a.FilePath = s.FilePath;
                    a.StartDateTime = s.StartDateTime;
                    a.PostSubmissionDateTime = s.PostSubmissionDateTime;
                    a.Status = s.Status;
                    lst.Add(a);
                }
            }

            return lst.ToList();
           //return new string[] { "value1", "value2" };
        }

        //// GET: api/Assignment/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        private UserManager<ApplicationUser> _userManager;

        public async Task<string> GetCurrentUserAsync()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return user.Email;

        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("Upload")]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [Route("GetAssignmentFileName/{AssignmentId}")]
        public Object GetFileName(int AssignmentId)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            string filePath = db.Assignments.Where(a1 => a1.Id == AssignmentId).FirstOrDefault().FilePath;
            string[] temp = filePath.Split('/');
            int temp1 = temp.Count();
            string fileName = temp[temp.Count() - 1];
            return new { fileName };
        }

        [HttpGet]
        [Route("Download/{AssignmentId}")]
        public IActionResult DownloadFile(int AssignmentId)
        {
            //string v = "1.jpg";
            //var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            //currentDirectory = currentDirectory + "\\Resources\\Images";
            ////var file = Path.Combine(Path.Combine(currentDirectory), fileName);
            ////return new FileStream(file, FileMode.Open, FileAccess.Read);

            //IFileProvider provider = new PhysicalFileProvider(currentDirectory);
            //IFileInfo fileInfo = provider.GetFileInfo(fileName);
            //var readStream = fileInfo.CreateReadStream();
            //var mimeType = "application/vnd.ms-excel";
            //return File(readStream, mimeType, fileName);

            //var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            //currentDirectory = currentDirectory + "\\src";
            //var file = "D:/UET/FYP/Backend/DBM_Backend/Backend/DBM(API)/DBM/Resources/Images/1.jpg";
            //return new FileStream(file, FileMode.Open, FileAccess.Read);

            //var file = "D:/UET/FYP/Backend/DBM_Backend/Backend/DBM(API)/DBM/Resources/Images/1.jpg";
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            currentDirectory = currentDirectory + "\\Resources\\Images";
            string filePath = db.Assignments.Where(a1 => a1.Id == AssignmentId).FirstOrDefault().FilePath;
            string[] temp = filePath.Split('/');
            int temp1 = temp.Count();
            string fileName = temp[temp.Count() - 1];
            //var file = Path.Combine(Path.Combine(currentDirectory), fileName);
            byte[] bytes = System.IO.File.ReadAllBytes(currentDirectory + "\\" + fileName);
            var p = "a";
            return new FileContentResult(bytes, "application/octet")
            {
                FileDownloadName = fileName
            };
        }


        // POST: api/Assignment
        [HttpPost, DisableRequestSizeLimit]
        [Route("SaveAssignment/{CourseId}")]
        public IActionResult Post([FromBody] AssignmentsViewModel val, int CourseId)
        {
            string tempFilePath = val.FilePath;
            val.FilePath = "Resources/Images/";
            val.FilePath = val.FilePath + tempFilePath;

            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            Assignments ass = new Assignments();

            ass.Title = val.Title;
            ass.FilePath = val.FilePath;
            ass.SubmissionDateTime = val.SubmissionDate;
            ass.StartDateTime = val.StartDateTime;
            ass.Status = "Available";
            ass.PostSubmissionDateTime = val.SubmissionDate;
            ass.CreatedBy = db.Users.Where(u => u.Email.Equals(val.Email)).FirstOrDefault().Id;
            ass.UpdatedBy = db.Users.Where(u => u.Email.Equals(val.Email)).FirstOrDefault().Id; ;
            ass.CreatedOn = DateTime.Now;
            ass.UpdatedOn = DateTime.Now;
            ass.CourseId = db.Courses.Where(c => c.Id == CourseId).FirstOrDefault().Id;
            db.Assignments.Add(ass);

            db.SaveChanges();
            return Ok();
        }
        
         
        // PUT: api/Assignment/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] AssignmentsViewModel val)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            if (db.Assignments.Any(b => b.Title == val.Title && b.FilePath == val.FilePath))
            {
                ModelState.AddModelError("UniqueAssignment", "This assignment already exists");
                return BadRequest(ModelState);
            }
            //else if (val.SubmissionDateTime < DateTime.Now)
            //{
            //    ModelState.AddModelError("", "Enter valid Submission Date");
            //    return BadRequest(ModelState);
            //}
            else if (val.StartDateTime < DateTime.Now)
            {
                ModelState.AddModelError("", "Enter valid Submission Date");
                return BadRequest(ModelState);
            }
            db.Assignments.Where(b => b.Id == id).FirstOrDefault().Title = val.Title;
            db.Assignments.Where(b => b.Id == id).FirstOrDefault().FilePath = val.FilePath;
            db.Assignments.Where(b => b.Id == id).FirstOrDefault().PostSubmissionDateTime = val.PostSubmissionDateTime;
            //db.Assignments.Where(b => b.Id == id).FirstOrDefault().SubmissionDateTime = val.SubmissionDateTime;
            db.Assignments.Where(b => b.Id == id).FirstOrDefault().UpdatedOn = DateTime.Now;
            db.Assignments.Where(b => b.Id == id).FirstOrDefault().UpdatedBy = 1;
            // cd.UpdatedBy = db.Users.Where(b => b.Email == GetCurrentUserAsync().ToString()).FirstOrDefault().Id;
            db.SaveChanges();
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
