using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class AssignmentSubmission
    {
        public int Id { get; set; }
        public DateTime SubmissionDateTime { get; set; }
        public int StudentGroupid { get; set; }
        public string AssignmentFilePath { get; set; }
        public int AssignmentId { get; set; }

        public virtual Assignments Assignment { get; set; }
        public virtual StudentGroupNumber StudentGroup { get; set; }
    }
}
