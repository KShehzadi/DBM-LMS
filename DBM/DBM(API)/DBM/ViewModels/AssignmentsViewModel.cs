using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DBM.ViewModels
{
    public class AssignmentsViewModel
    {

        public string Email { get; set; }
   
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string FilePath { get; set; }

        public string Title { get; set; }

        public List<string> GroupRegNo { get; set; }

        public DateTime SubmissionDate { get; set; }

        public DateTime PostSubmissionDateTime { get; set; }

        public DateTime StartDateTime { get; set; }

        public string Status { get; set; }

        public DateTime CreatedOn { get; set; }

        public string CreatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public string UpdatedBy { get; set; }

        public string CourseName { get; set; }

    }
}
