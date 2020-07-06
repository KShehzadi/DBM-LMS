using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DBM.Models;
using DBM.ViewModels;
using System.Net.Mail;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseEnrollmentController : ControllerBase
    {
        // GET: api/CourseEnrollment
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/CourseEnrollment/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/CourseEnrollment
        [HttpPost]
        [Route("EnrolmentPending")]
        public IActionResult Post([FromBody]CourseViewModel course)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            CourseEnrollment c = new CourseEnrollment();
            c.CourseId = db.Courses.Where(b => b.CourseCode == course.courseCode).FirstOrDefault().Id;
            c.UserId = course.UserId;
            c.EnrollmentStatus = "Pending";
            db.Add(c);
            db.SaveChanges();
            return Ok();
        }

        public bool SendEmail(string Name, string Email, string Body)
        {

            try
            {
                // Credentials
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("harriskhaan41@gmail.com");
                mail.To.Add(Email);
                mail.Subject = "Approval Email";
                mail.Body = Body;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("harriskhaan41@gmail.com", "Ashi*123");
                SmtpServer.EnableSsl = true;
                SmtpServer.Timeout = 20000;
                SmtpServer.Send(mail);
                return true;
            }
            catch (System.Exception e)
            {
                return false;
            }

        }

        [HttpGet]
        [Route("ApproveRequest/{id}")]
        public IActionResult ApproveRequest(string id)
        {
            //string email = " ";
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            var user = db.Users.Where(a =>a.Id == Convert.ToInt32(id)).FirstOrDefault();
            var crs = db.CourseEnrollment.Where(b => b.UserId == (user.Id)).SingleOrDefault();
            string Message = "Your request for course enrollment is approved";
            if(SendEmail(user.FirstName+" "+user.LastName , user.Email, Message))
            {
                crs.EnrollmentStatus = "Approved";
                db.SaveChanges();
            }
            return Ok();
        }

        //[HttpPut]
        //[Route("Disapprove")]
        //public IActionResult DisApproveRequest([FromBody]CourseEnrollment course)
        //{
        //    DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
        //    if (!db.CourseEnrollment.Any(b => b.Id ==course.Id))
        //    {
        //        ModelState.AddModelError("", "Enrollment request at this id doesn't exist");
        //        return BadRequest(ModelState);
        //    }
        //    CourseEnrollment i = db.CourseEnrollment.Single(b => b.Id == course.Id);
        //    db.CourseEnrollment.Remove(i);
        //    db.SaveChanges();
        //    return Ok();
        //}
        //[MultiPostParameters]
        [HttpGet("{UserId}/{CourseId}")]
        
        public IEnumerable<CourseEnrollmentViewModel> GetCourseEnrollments(int UserId, int CourseId)
        {
            List<CourseEnrollmentViewModel> courseLst = new List<CourseEnrollmentViewModel>();
            //List<CourseEnrollment> courseLst = new List<CourseEnrollment>();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
         
            if(db.Users.Where(b=>b.Id==UserId).FirstOrDefault().Designation=="Teacher")
            {
                foreach (CourseEnrollment e in db.CourseEnrollment)
                {
                    if (e.CourseId == CourseId && (e.EnrollmentStatus =="Pending"))
                    {
                
                        CourseEnrollmentViewModel c = new CourseEnrollmentViewModel();
                        c.Email = db.Users.Where(b => b.Id == e.UserId).FirstOrDefault().Email;
                        c.UserId = e.UserId;
                        c.UserName = db.Users.Where(b => b.Id == e.UserId).FirstOrDefault().FirstName + " " + db.Users.Where(b => b.Id == e.UserId).FirstOrDefault().LastName;
                        courseLst.Add(c);

                    }
                }
            }
            
            return courseLst;
        }


        // PUT: api/CourseEnrollment/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] CourseEnrollmentViewModel course)
        //{

        //}

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            if (!db.CourseEnrollment.Any(b => b.UserId == id))
            {
                ModelState.AddModelError("", "Enrollment request at this id doesn't exist");
                return BadRequest(ModelState);
            }
            CourseEnrollment i = db.CourseEnrollment.Single(b => b.UserId == id);
            var user = db.Users.Where(b => b.Id == id).SingleOrDefault();
            string Name = user.FirstName + " " + user.LastName;
            string Email = user.Email;
            string message = "Your request has been disapproved";
            db.CourseEnrollment.Remove(i);
            if(SendEmail(Name, Email, message))
            {
                db.SaveChanges();
            }
            //db.SaveChanges();
            return Ok();

        }
    }
}
