using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DBM.Models;
using DBM.ViewModels;
using System.IO;
using System.Net.Http.Headers;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        // GET: api/Notes
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        [Route("Download/{Id}")]
        public IActionResult DownloadFile(int Id)
        {
            try
            {
                DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
                var currentDirectory = System.IO.Directory.GetCurrentDirectory();
                currentDirectory = currentDirectory + "\\Resources\\Notes";
                string filePath = db.Notes.Where(a1 => a1.Id == Id).FirstOrDefault().FilePath;
                string[] tempo = filePath.Split('/');
                // int temp1 = tempo.Count();
                string fileName = tempo[tempo.Count() - 1];
                //var file = Path.Combine(Path.Combine(currentDirectory), fileName);
                byte[] bytes = System.IO.File.ReadAllBytes(currentDirectory + "\\" + fileName);
                var p = "a";
                return new FileContentResult(bytes, "application/octet")
                {
                    FileDownloadName = fileName
                };
            }
            catch(Exception e)
            {
                throw (e);
            }
           
        }

        [HttpGet]
        [Route("GetNotesFileName/{Id}")]
        public Object GetNotesFileName(int Id)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            string filePath = db.Notes.Where(a1 => a1.Id == Id).FirstOrDefault().FilePath;
            string[] temp = filePath.Split('/');
            int temp1 = temp.Count();
            string fileName = temp[temp.Count() - 1];
            return new { fileName };
        }
        [HttpGet]
        [Route("getLectureNotes/{lectureId}")]
        public IEnumerable<LectureViewModel> getLectureNotes(int lectureId)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            List<LectureViewModel> list = new List<LectureViewModel>();
            foreach (Notes v in db.Notes)
            {
                if (v.Lectureid == lectureId)
                {
                    LectureViewModel lc = new LectureViewModel();
                    lc.Name = v.Title;
                    lc.Id = v.Id;
                    lc.FilePath = v.FilePath;
                    list.Add(lc);
                }
            }
            return list;

        }
        [HttpPost, DisableRequestSizeLimit]
        [Route("Upload")]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Notes");
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


        [HttpPost]
        [Route("UploadLectureNotes")]
        public IActionResult UploadLectureNotes([FromBody] LectureViewModel obj)
        {

            string tempFilePath = obj.FilePath;
            obj.FilePath = "Resources/Notes/";
            obj.FilePath = obj.FilePath + tempFilePath;
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            Notes v = new Notes();
            v.CourseId = obj.courseId;
            v.Title = obj.Name;
            v.Lectureid = obj.LectureId;
            v.FilePath = obj.FilePath;
            v.UpdatedBy = db.Users.Where(a=>a.Email == obj.userId).FirstOrDefault().Id;
            v.CreatedBy = db.Users.Where(a => a.Email == obj.userId).FirstOrDefault().Id;
            v.UpdatedOn = DateTime.Now;
            v.CreatedOn = DateTime.Now;
            db.Add(v);
            db.SaveChanges();
            return Ok();
        }

        // POST: api/Notes
       

        // PUT: api/Notes/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
