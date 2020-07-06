using System;
using System.Collections.Generic;

namespace DBM.Models
{
    public partial class GroupsAssignedPermissions
    {
        public int Id { get; set; }
        public int UserGroupId { get; set; }
        public int PermissionId { get; set; }

        public virtual PermissionLookup Permission { get; set; }
        public virtual UserGroups UserGroup { get; set; }
    }
}
