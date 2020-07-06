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
    public class LectureController : ControllerBase
    {
        // GET: api/Lecture
        [HttpGet("{courseId}")]
        public IEnumerable<Lectures> Get(int courseId)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            return db.Lectures.Where(b => b.CourseId == courseId).ToList();

        }

        [HttpGet]
        [Route("Download/{Id}")]
        public IActionResult DownloadFile(int Id)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            currentDirectory = currentDirectory + "\\Resources\\Videos";
            string filePath = db.Video.Where(a1 => a1.Id == Id).FirstOrDefault().VideoFilePath;
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

        [HttpGet]
        [Route("GetVideoFileName/{Id}")]
        public Object GetFileName(int Id)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            string filePath = db.Video.Where(a1 => a1.Id == Id).FirstOrDefault().VideoFilePath;
            string[] temp = filePath.Split('/');
            int temp1 = temp.Count();
            string fileName = temp[temp.Count() - 1];
            return new { fileName };
        }
        [HttpGet]
        [Route("getLectureVideos/{lectureId}")]
        public IEnumerable<LectureViewModel> getLectureVideos(int lectureId)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            List<LectureViewModel> list = new List<LectureViewModel>();
            foreach(Video v in db.Video)
            {
                if(v.Lectureid == lectureId)
                {
                    LectureViewModel lc = new LectureViewModel();
                    lc.Name = v.Titel;
                    lc.Id = v.Id;
                    lc.FilePath = v.VideoFilePath;
                    list.Add(lc);
                }
            }
            return list;

        }

        // GET: api/Lecture/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Lecture
        [HttpPost]
        public IActionResult Post([FromBody] LectureViewModel obj)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            Lectures l = new Lectures();
            if(!db.Courses.Any(b=>b.Id == obj.courseId))
            {
                ModelState.AddModelError("", "Course with course id doesn't exist");
                return BadRequest(ModelState);
            }

            l.CourseId = obj.courseId;
            l.Name = obj.Name;
            db.Add(l);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("Upload")]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Videos");
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
        [Route("UploadLectureVideo")]
        public IActionResult UploadLectureVideo([FromBody] LectureViewModel obj)
        {

            string tempFilePath = obj.FilePath;
            obj.FilePath = "Resources/Videos/";
            obj.FilePath = obj.FilePath + tempFilePath;
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            Video v = new Video();
            v.CourseId = obj.courseId;
            v.Titel = obj.Name;
            v.Lectureid = obj.LectureId;
            v.VideoFilePath = obj.FilePath;
            db.Add(v);
            db.SaveChanges();
            return Ok();
        }

        // PUT: api/Lecture/5
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
