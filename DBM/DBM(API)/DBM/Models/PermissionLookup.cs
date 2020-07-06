using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class PermissionLookup
    {
        public PermissionLookup()
        {
            GroupsAssignedPermissions = new HashSet<GroupsAssignedPermissions>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<GroupsAssignedPermissions> GroupsAssignedPermissions { get; set; }
    }
}
