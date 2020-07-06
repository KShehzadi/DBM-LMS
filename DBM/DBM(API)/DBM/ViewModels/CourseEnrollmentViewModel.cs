using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBM.ViewModels
{
    public class CourseEnrollmentViewModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int CourseId { get; set; }
        public string EnrollmentStatus { get; set; }
    }
}
