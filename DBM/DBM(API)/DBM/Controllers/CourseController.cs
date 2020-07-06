using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBM.ViewModels;
using DBM.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        //// GET: api/Course
        [HttpGet]
        [Route("GetAllCourses/{id}")]
        public IEnumerable<CourseViewModel> Get(int id)
        {
            //DBMContext db = new DBMContext();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            List<CourseViewModel> courseLst = new List<CourseViewModel>();
            if(db.Users.Where(b=>b.Id == id).FirstOrDefault().Designation == "Admin")
            {
                foreach (Courses c in db.Courses)
                {
                    foreach (CourseInfo i in db.CourseInfo)
                    {
                        if (i.Courseid == c.Id && c.ParentCourseid == null && c.InstituteId == db.Users.Where(b=>b.Id == id).FirstOrDefault().InstituteId)
                        {
                            CourseViewModel v = new CourseViewModel();
                            v.id = c.Id;
                            v.courseSemester = i.CourseSemester;
                            v.courseSession = i.CourseYear.ToString();
                            string frstName = db.Users.Where(b => b.Id == i.CreatedBy).FirstOrDefault().FirstName;
                            string lastName = db.Users.Where(b => b.Id == i.CreatedBy).FirstOrDefault().LastName;
                            v.CreatedBy = frstName + " " + lastName;
                            string UpdatedFirst = db.Users.Where(b => b.Id == i.UpdatedBy).FirstOrDefault().FirstName;
                            string UpdatedLast = db.Users.Where(b => b.Id == i.UpdatedBy).FirstOrDefault().LastName;
                            v.UpdatedBy = UpdatedFirst + " " + UpdatedLast;
                            v.name = c.Name;
                            v.courseCode = c.CourseCode;
                            courseLst.Add(v);
                            break;
                        }
                    }
                }
            }
            return courseLst.ToList();
        }

        [HttpGet]
        [Route("GetCourseDetails/{CourseName}")]
        public string Get(string CourseName)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            string name = db.Courses.Where(b => b.Name == CourseName).FirstOrDefault().CourseCode;
            return "(" + name + ")" + CourseName;
        }

        [HttpGet("{id}")]
        public IEnumerable<CourseViewModel> GetCoursesAssignedToTeacher(int id)
        {
            //DBMContext db = new DBMContext();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            List<CourseViewModel> courseLst = new List<CourseViewModel>();
            
            if (db.Users.Where(u => u.Id == id).FirstOrDefault().Designation == "Teacher")
            {
                foreach (TeachersAssignedCourses ac in db.TeachersAssignedCourses)
                {
                    if (ac.UserId == id)
                    {
                        CourseViewModel c = new CourseViewModel();
                        c.id = db.Courses.Where(c1 => c1.Id == ac.CourseId).FirstOrDefault().Id;
                        c.name = db.Courses.Where(c1 => c1.Id == ac.CourseId).FirstOrDefault().Name;
                        c.courseCode = db.Courses.Where(c1 => c1.Id == ac.CourseId).FirstOrDefault().CourseCode;
                        courseLst.Add(c);
                    }
                }
                return courseLst.ToList();
            }
            else if (db.Users.Where(u => u.Id == id).FirstOrDefault().Designation == "Student" || db.Users.Where(u => u.Id == id).FirstOrDefault().Designation == "Admin")
            {
                foreach (Courses c in db.Courses)
                {
                    if(c.InstituteId == db.Users.Where(b=>b.Id == id).FirstOrDefault().InstituteId)
                    {
                        CourseViewModel cd= new CourseViewModel();
                        cd.id = c.Id;
                        cd.name = c.Name;
                        cd.courseCode = c.CourseCode;
                        courseLst.Add(cd);
                    }
                }
            }
            return courseLst;
            
        }

        [HttpPost]
        [Route("PostGetAssignedTeacher")]
        public void PostGetAssignedTeacher([FromBody] CourseViewModel course)
        {
            //return GetCoursesAssignedToTeacher(course.Email);
        }


        // POST: api/Course
        [HttpPost]
        [Route("AddCourse")]
        public IActionResult Post([FromBody] CourseViewModel course)
        {

            // DBMContext db = new DBMContext();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            Courses c = new Courses();
            if (db.Courses.Any(b => b.Name == course.name && b.CourseCode == course.courseCode))
            {
                int year = db.CourseInfo.Where(b => b.Courseid == db.Courses.Where(r=> r.Name == course.name).FirstOrDefault().Id).FirstOrDefault().CourseYear;
                string semester = db.CourseInfo.Where(b => b.Courseid == db.Courses.Where(r => r.Name == course.name).FirstOrDefault().Id).FirstOrDefault().CourseSemester;
                if (year == Int32.Parse(course.courseSession) && course.courseSemester == semester)
                {
                    ModelState.AddModelError("", "Course already exists");
                    return BadRequest(ModelState);
                }
            }
            c.CourseCode = course.courseCode;
            c.Name = course.name;
            c.InstituteId = db.Users.Where(b => b.Email == course.email).FirstOrDefault().InstituteId;
            //c.InstituteId = 1;
            c.ParentCourseid = null;
            db.Courses.Add(c);
            db.SaveChanges();
            CourseInfo cd = new CourseInfo();
            cd.CreatedOn = DateTime.Now;
            cd.CreatedBy = db.Users.Where(b => b.Email == course.email).FirstOrDefault().Id;
            //cd.CreatedBy = 1;
            cd.UpdatedOn = DateTime.Now;
            cd.UpdatedBy = 1;
            cd.CourseSemester = course.courseSemester;
            cd.CourseYear = Int32.Parse(course.courseSession);
            cd.Courseid = db.Courses.Where(b => b.Name == course.name).FirstOrDefault().Id;
            
            db.CourseInfo.Add(cd);
            db.SaveChanges();
            return Ok();
           
        }

        // PUT: api/Course/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CourseViewModel course)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            //DBMContext db = new DBMContext();
            int? courseId = db.CourseInfo.Where(b => b.Courseid == id).FirstOrDefault().Courseid;
            if (db.Courses.Any(b => b.Name == course.name && b.CourseCode == course.courseCode))
            {
                int year = db.CourseInfo.Where(b => b.Courseid == db.Courses.Where(r => r.Name == course.name).FirstOrDefault().Id).FirstOrDefault().CourseYear;
                if (year == Int32.Parse(course.courseSession))
                {
                    ModelState.AddModelError("", "Course already exists");
                    return BadRequest(ModelState);
                }
            }
            db.Courses.Where(b => b.Id == courseId).SingleOrDefault().CourseCode = course.courseCode;
            db.Courses.Where(b => b.Id == courseId).SingleOrDefault().Name =course.name;
            db.CourseInfo.Where(b => b.Courseid == courseId).SingleOrDefault().UpdatedOn = DateTime.Now;
          //  db.CourseInfo.Where(b => b.Id == id).SingleOrDefault().UpdatedBy = db.Users.Where(b => b.Email == GetCurrentUserAsync().ToString()).FirstOrDefault().Id
            db.CourseInfo.Where(b => b.Courseid == courseId).SingleOrDefault().UpdatedBy = db.Users.Where(a => a.Email == course.email).FirstOrDefault().Id;
            db.CourseInfo.Where(b => b.Courseid == courseId).SingleOrDefault().CourseSemester = course.courseSemester;
            db.CourseInfo.Where(b => b.Courseid == courseId).SingleOrDefault().CourseYear =Int32.Parse(course.courseSession);
            db.SaveChanges();
            return Ok();

        }

        [HttpGet]
        [Route("GetAllTeachers")]
        public List<CourseViewModel> getAllTeachers()
        {
            List<CourseViewModel> t = new List<CourseViewModel>();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            foreach(Users u in db.Users)
            {
                if(u.Designation == "Teacher")
                {
                    CourseViewModel c = new CourseViewModel();
                    c.email = u.Email;
                    t.Add(c);
                }
            }
            return t;
        }
        

        [HttpPost]
        [Route("AssignTeacher")]
        public IActionResult AssignedCoursesToTeacher([FromBody] CourseViewModel course)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            TeachersAssignedCourses t = new TeachersAssignedCourses();
            bool k = false;
            t.CourseId = db.Courses.Where(b => b.Name == course.name).FirstOrDefault().Id;
            t.UserId = db.Users.Where(b => b.Email == course.email).FirstOrDefault().Id;
            foreach (TeachersAssignedCourses t1 in db.TeachersAssignedCourses)
            {
                if (t1.CourseId == t.CourseId && t1.UserId == t.UserId)
                {
                    k = true;
                    break;
                }
            }
            //Nullable<int> k = db.TeachersAssignedCourses.Where(p => p.UserId == t.UserId).FirstOrDefault().CourseId;
            if (k == false)
            {
                db.Add(t);
                db.SaveChanges();
                return Ok();
            }
            else
            {
                ModelState.AddModelError("", "Course already assigned to this teacher");
                return BadRequest(ModelState);
            }
            
            
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
