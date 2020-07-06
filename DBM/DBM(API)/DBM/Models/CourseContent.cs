using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class CourseContent
    {
        public int Id { get; set; }
        public string FilePath { get; set; }
        public string Name { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int AddedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int CourseId { get; set; }

        public virtual Users AddedByNavigation { get; set; }
        public virtual Courses Course { get; set; }
        public virtual Users UpdatedByNavigation { get; set; }
    }
}
