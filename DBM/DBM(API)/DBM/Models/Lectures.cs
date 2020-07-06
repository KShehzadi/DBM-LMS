using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class Lectures
    {
        public Lectures()
        {
            Notes = new HashSet<Notes>();
            Video = new HashSet<Video>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int CourseId { get; set; }

        public virtual Courses Course { get; set; }
        public virtual ICollection<Notes> Notes { get; set; }
        public virtual ICollection<Video> Video { get; set; }
    }
}
