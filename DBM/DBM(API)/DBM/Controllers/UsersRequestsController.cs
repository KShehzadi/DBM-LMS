using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DBM.Models;
using DBM.ViewModels;
using System.Net;
using System.Net.Mail;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersRequestsController : ControllerBase
    {

        [HttpGet]
        [Route("ApproveStudent/{id}")]
        public IActionResult ApproveStudent(string id)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            var user = db.Users.Where(b => b.Id == Convert.ToInt32(id)).SingleOrDefault();
            string Name = user.FirstName + " " + user.LastName;
            string Email = user.Email;
            string Body = "Your request has been approved";
            if (SendEmail(Name, Email, Body))
            {
                user.LoginStatus = 1;
            }
            db.SaveChanges();
            return Ok();
           // .LoginStatus = 1;
        }

        [HttpGet]
        [Route("ApproveTeacher/{id}")]
        public IActionResult ApproveTeacher(string id)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            var user = db.Users.Where(b => b.Id == Convert.ToInt32(id)).SingleOrDefault();
            string Name = user.FirstName + " " + user.LastName;
            string Email = user.Email;
            string Body = "Your request has been approved";
            if (SendEmail(Name, Email, Body))
            {
                user.LoginStatus = 1;
            }
            db.SaveChanges();
            return Ok();
        }

        // GET: api/UsersRequests
        // [HttpGet("GetAllStudentsRequests/{InstituteId}")]
        [HttpGet]
        [Route("GetAllStudentsRequests/{Id}")]
     
        public IEnumerable<StudentsRequestsViewModel> GetAllStudentsRequests(int Id)
        {
            //UsersRequestsViewModel u = new UsersRequestsViewModel();
            List<StudentsRequestsViewModel> lst = new List<StudentsRequestsViewModel>();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            int InstId = db.Users.Where(b => b.Id == Id).FirstOrDefault().InstituteId;
            foreach (Users u in db.Users)
            {
               
                if (u.InstituteId == InstId && u.Designation == "Student" && u.LoginStatus == 0)
                {
                    StudentsRequestsViewModel usr = new StudentsRequestsViewModel();
                    usr.name = u.FirstName + ' ' + u.LastName;
                    usr.email = u.Email;
                    usr.id = u.Id;
                    lst.Add(usr);
                }
                
            }
            return lst;
        }

        [HttpGet]
        [Route("GetAllTeachersRequests/{Id}")]

        public IEnumerable<TeachersRequestViewModel> Get(int Id)
        {
            
            //UsersRequestsViewModel u = new UsersRequestsViewModel();
            List<TeachersRequestViewModel> lst = new List<TeachersRequestViewModel>();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            int InstituteId = db.Users.Where(b => b.Id == Id).FirstOrDefault().InstituteId;
            foreach (Users u in db.Users)
            {
                
                if (u.InstituteId == InstituteId && u.Designation == "Teacher" && u.LoginStatus == 0)
                {
                    TeachersRequestViewModel user = new TeachersRequestViewModel();
                    user.Name = u.FirstName + ' ' + u.LastName;
                    user.Email = u.Email;
                    user.id = u.Id;
                    lst.Add(user);
                }
                
            }
            return lst;
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
                mail.Subject ="Approval Email";
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
    
    // POST: api/UsersRequests
        

        /*[HttpPost]
        [Route("ApproveTeacherRequest")]
        public IActionResult ApproveTeacherRequest([FromBody] TeachersRequestViewModel obj)
        {



            return Ok();
        }
        */
        // PUT: api/UsersRequests/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            var user = db.Users.Where(b => b.Id == id).SingleOrDefault();
            string Name = user.FirstName + " " + user.LastName;
            string Email = user.Email;
            string message = "Your request has been disapproved";
            db.Users.Remove(user);
            if(SendEmail(Name, Email, message))
            {
                db.SaveChanges();
            }
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        [Route("DeleteTeacher/{id}")]
        public IActionResult DeleteTeacher(int id)
        {

            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            var user = db.Users.Where(b => b.Id == id).SingleOrDefault();
            string Name = user.FirstName + " " + user.LastName;
            string Email = user.Email;
            string message = "Your request has been disapproved";
            db.Users.Remove(user);
            if (SendEmail(Name, Email, message))
            {
                db.SaveChanges();
            }
            return Ok();
        }
    }
}
