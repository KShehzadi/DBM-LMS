using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class Users
    {
        public Users()
        {
            AnnouncementCreatedByNavigation = new HashSet<Announcement>();
            AnnouncementUpdatedByNavigation = new HashSet<Announcement>();
            AssignmentsCreatedByNavigation = new HashSet<Assignments>();
            AssignmentsUpdatedByNavigation = new HashSet<Assignments>();
            CourseContentAddedByNavigation = new HashSet<CourseContent>();
            CourseContentUpdatedByNavigation = new HashSet<CourseContent>();
            CourseEnrollment = new HashSet<CourseEnrollment>();
            CourseInfoCreatedByNavigation = new HashSet<CourseInfo>();
            CourseInfoUpdatedByNavigation = new HashSet<CourseInfo>();
            NotesCreatedByNavigation = new HashSet<Notes>();
            NotesUpdatedByNavigation = new HashSet<Notes>();
            StudentGroup = new HashSet<StudentGroup>();
            TeachersAssignedCourses = new HashSet<TeachersAssignedCourses>();
            UserAssignedGroups = new HashSet<UserAssignedGroups>();
            UserCourseMtm = new HashSet<UserCourseMtm>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Cnic { get; set; }
        public string RegNo { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Designation { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int LoginStatus { get; set; }
        public int ActiveStatue { get; set; }
        public int InstituteId { get; set; }

        public virtual Institute Institute { get; set; }
        public virtual ICollection<Announcement> AnnouncementCreatedByNavigation { get; set; }
        public virtual ICollection<Announcement> AnnouncementUpdatedByNavigation { get; set; }
        public virtual ICollection<Assignments> AssignmentsCreatedByNavigation { get; set; }
        public virtual ICollection<Assignments> AssignmentsUpdatedByNavigation { get; set; }
        public virtual ICollection<CourseContent> CourseContentAddedByNavigation { get; set; }
        public virtual ICollection<CourseContent> CourseContentUpdatedByNavigation { get; set; }
        public virtual ICollection<CourseEnrollment> CourseEnrollment { get; set; }
        public virtual ICollection<CourseInfo> CourseInfoCreatedByNavigation { get; set; }
        public virtual ICollection<CourseInfo> CourseInfoUpdatedByNavigation { get; set; }
        public virtual ICollection<Notes> NotesCreatedByNavigation { get; set; }
        public virtual ICollection<Notes> NotesUpdatedByNavigation { get; set; }
        public virtual ICollection<StudentGroup> StudentGroup { get; set; }
        public virtual ICollection<TeachersAssignedCourses> TeachersAssignedCourses { get; set; }
        public virtual ICollection<UserAssignedGroups> UserAssignedGroups { get; set; }
        public virtual ICollection<UserCourseMtm> UserCourseMtm { get; set; }
    }
}
