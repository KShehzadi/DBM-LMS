using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class UserAssignedGroups
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int UserGroupId { get; set; }

        public virtual Users User { get; set; }
        public virtual UserGroups UserGroup { get; set; }
    }
}
