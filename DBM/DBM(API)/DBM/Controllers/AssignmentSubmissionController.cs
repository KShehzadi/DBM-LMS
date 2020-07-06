using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DBM.Models;
using DBM.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentSubmissionController : ControllerBase
    {


        [Route("Upload")]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "SubmittedAssignments");
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


        // GET: api/AssignmentSubmission
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/AssignmentSubmission/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AssignmentSubmission
        [HttpPost]
        [Route("SubmitAssignment/{AssignmentId}")]
        public void Post([FromBody] AssignmentsViewModel obj, int AssignmentId)
        {
            string tempFilePath = obj.FilePath;
            obj.FilePath = "Resources/SubmittedAssignments/";
            obj.FilePath = obj.FilePath + tempFilePath;
            var tempReg1 = obj.GroupRegNo[0];

            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            int GroupMembersCount = obj.GroupRegNo.Count();
            
            
            StudentGroupNumber s = new StudentGroupNumber();
            db.StudentGroupNumber.Add(s);
            db.SaveChanges();
            int? groupId = db.StudentGroupNumber.Max(s1 => (int?)s1.Id);
            
            for (int i = 0; i < GroupMembersCount; i++)
            {
                StudentGroup sg = new StudentGroup();
                sg.Groupid = groupId;
                string tempReg = obj.GroupRegNo[i].ToString();
                sg.Userid = db.Users.Where(u => u.RegNo == tempReg).FirstOrDefault().Id;
                db.Add(sg);
            }

            AssignmentSubmission ass = new AssignmentSubmission();
            ass.SubmissionDateTime = obj.SubmissionDate;
            ass.StudentGroupid = GroupMembersCount;
            ass.AssignmentFilePath = obj.FilePath;
            ass.AssignmentId = AssignmentId;
            db.Add(ass);

            db.SaveChanges();




        }

        // PUT: api/AssignmentSubmission/5
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
