using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class Assignments
    {
        public Assignments()
        {
            AssignmentQuestion = new HashSet<AssignmentQuestion>();
            AssignmentSubmission = new HashSet<AssignmentSubmission>();
        }

        public int Id { get; set; }
        public string FilePath { get; set; }
        public string Title { get; set; }
        public DateTime SubmissionDateTime { get; set; }
        public DateTime PostSubmissionDateTime { get; set; }
        public DateTime StartDateTime { get; set; }
        public string Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int CourseId { get; set; }

        public virtual Courses Course { get; set; }
        public virtual Users CreatedByNavigation { get; set; }
        public virtual Users UpdatedByNavigation { get; set; }
        public virtual ICollection<AssignmentQuestion> AssignmentQuestion { get; set; }
        public virtual ICollection<AssignmentSubmission> AssignmentSubmission { get; set; }
    }
}
