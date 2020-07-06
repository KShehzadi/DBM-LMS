using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class CourseEnrollment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public string EnrollmentStatus { get; set; }

        public virtual Courses Course { get; set; }
        public virtual Users User { get; set; }
    }
}
