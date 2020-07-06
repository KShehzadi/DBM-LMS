using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class UserGroups
    {
        public UserGroups()
        {
            GroupsAssignedPermissions = new HashSet<GroupsAssignedPermissions>();
            UserAssignedGroups = new HashSet<UserAssignedGroups>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int InstituteId { get; set; }

        public virtual Institute Institute { get; set; }
        public virtual ICollection<GroupsAssignedPermissions> GroupsAssignedPermissions { get; set; }
        public virtual ICollection<UserAssignedGroups> UserAssignedGroups { get; set; }
    }
}
