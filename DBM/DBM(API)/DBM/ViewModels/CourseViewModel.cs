using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBM.ViewModels
{
    public class CourseViewModel
    {
        public int id { get; set; }

        public string name { get; set; }

        public string email { get; set; }

        public string courseCode { get; set; }

        public int InstituteId { get; set; }

        //public int TeacherId { get; set; }

        public string CreatedBy { get; set; }

        public string courseSession { get; set; }
        public string courseSemester { get; set; }

        public DateTime CreatedOn { get; set; }
        public string EnrollmentStatus { get; set; }

        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }

        public int UserId { get; set; }

    }
}
