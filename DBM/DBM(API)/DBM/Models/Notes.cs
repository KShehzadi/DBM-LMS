using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class Notes
    {
        public int Id { get; set; }
        public string FilePath { get; set; }
        public string Title { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int CourseId { get; set; }
        public int? Lectureid { get; set; }

        public virtual Courses Course { get; set; }
        public virtual Users CreatedByNavigation { get; set; }
        public virtual Lectures Lecture { get; set; }
        public virtual Users UpdatedByNavigation { get; set; }
    }
}
