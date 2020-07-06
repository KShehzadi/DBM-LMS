using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DBM.Models;
using DBM.ViewModels;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        // GET: api/Announcement
        [HttpGet("{CourseId}")]
        public IEnumerable<AnnouncementViewModel>Get(int CourseId)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            List<AnnouncementViewModel> lst = new List<AnnouncementViewModel>();
            if(db.Announcement.Any(a=>a.CourseId == CourseId))
            {
                foreach (Announcement a in db.Announcement)
                {
                    AnnouncementViewModel obj = new AnnouncementViewModel();
                    if (a.CourseId == CourseId)
                    {
                        obj.Title = a.Title;
                        string day = a.CreatedOn.DayOfWeek.ToString();
                        string date = a.CreatedOn.Day.ToString();
                        string year = a.CreatedOn.Year.ToString();
                        obj.postedDate = day + ' ' + date + ',' + year;
                        obj.Description = a.Description;
                        lst.Add(obj);
                    }
                }
            }
           
            return lst;
        }

        // GET: api/Announcement/5
    
        // POST: api/Announcement
        [HttpPost]
        public IActionResult Post([FromBody] AnnouncementViewModel obj)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            Announcement a = new Announcement();
            a.CreatedBy = db.Users.Where(b => b.Email == obj.Email).FirstOrDefault().Id;
            a.UpdatedBy = db.Users.Where(b => b.Email == obj.Email).FirstOrDefault().Id;
            a.CreatedOn = DateTime.Now;
            a.UpdatedOn = DateTime.Now;
            a.Title = obj.Title;
            a.Description = obj.Description;
            a.CourseId = db.Courses.Where(b=>b.Name == obj.CourseName).FirstOrDefault().Id;
            db.Announcement.Add(a);
            db.SaveChanges();
            return Ok();

        }

        // PUT: api/Announcement/5
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
