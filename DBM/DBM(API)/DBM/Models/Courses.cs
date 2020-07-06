using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class Courses
    {
        public Courses()
        {
            Announcement = new HashSet<Announcement>();
            Assignments = new HashSet<Assignments>();
            CourseContent = new HashSet<CourseContent>();
            CourseEnrollment = new HashSet<CourseEnrollment>();
            CourseInfo = new HashSet<CourseInfo>();
            InverseParentCourse = new HashSet<Courses>();
            Lectures = new HashSet<Lectures>();
            Notes = new HashSet<Notes>();
            TeachersAssignedCourses = new HashSet<TeachersAssignedCourses>();
            UserCourseMtm = new HashSet<UserCourseMtm>();
            Video = new HashSet<Video>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string CourseCode { get; set; }
        public int? ParentCourseid { get; set; }
        public int InstituteId { get; set; }

        public virtual Institute Institute { get; set; }
        public virtual Courses ParentCourse { get; set; }
        public virtual ICollection<Announcement> Announcement { get; set; }
        public virtual ICollection<Assignments> Assignments { get; set; }
        public virtual ICollection<CourseContent> CourseContent { get; set; }
        public virtual ICollection<CourseEnrollment> CourseEnrollment { get; set; }
        public virtual ICollection<CourseInfo> CourseInfo { get; set; }
        public virtual ICollection<Courses> InverseParentCourse { get; set; }
        public virtual ICollection<Lectures> Lectures { get; set; }
        public virtual ICollection<Notes> Notes { get; set; }
        public virtual ICollection<TeachersAssignedCourses> TeachersAssignedCourses { get; set; }
        public virtual ICollection<UserCourseMtm> UserCourseMtm { get; set; }
        public virtual ICollection<Video> Video { get; set; }
    }
}
