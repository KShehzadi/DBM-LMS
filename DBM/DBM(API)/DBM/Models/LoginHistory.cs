using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class LoginHistory
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Status { get; set; }
        public DateTime StatusChangedAt { get; set; }
    }
}
