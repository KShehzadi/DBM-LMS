using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class Institute
    {
        public Institute()
        {
            Courses = new HashSet<Courses>();
            UserGroups = new HashSet<UserGroups>();
            Users = new HashSet<Users>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Courses> Courses { get; set; }
        public virtual ICollection<UserGroups> UserGroups { get; set; }
        public virtual ICollection<Users> Users { get; set; }
    }
}
