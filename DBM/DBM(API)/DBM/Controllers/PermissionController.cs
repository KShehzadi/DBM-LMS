using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DBM.Models;
using DBM.ViewModels;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        // GET: api/Permission
        [HttpGet]
        public IEnumerable<PermissionLookup> Get()
        {
            try
            {
                DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
                List<PermissionLookup> lst = new List<PermissionLookup>();
                foreach (PermissionLookup p in db.PermissionLookup)
                {
                    lst.Add(p);
                }
                return lst;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        //[HttpGet]
        //public IEnumerable<AssignedPermissionViewModel> GetAssignedPermissions()
        //{
        //    string Name;
        //    DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
        //    List<AssignedPermissionViewModel> lst = new List<AssignedPermissionViewModel>();
        //    foreach (UserGroups u in db.UserGroups)
        //    {
        //        AssignedPermissionViewModel a = new AssignedPermissionViewModel();
        //        a.group = u.Name;
        //        foreach (GroupsAssignedPermissions g in db.GroupsAssignedPermissions)
        //        {
        //            if (g.UserGroupId == u.Id)
        //            {
        //                Name = db.PermissionLookup.Where(b => b.Id == (db.GroupsAssignedPermissions.Where(obj => obj.UserGroupId == u.Id).SingleOrDefault().PermissionId)).SingleOrDefault().Name;
        //                a.PermissionLst.Add(Name);
        //            }
        //        }
        //        var obj = db.UserAssignedGroups.Where(b=>b.Id)
        //    }
        //}


        // GET: api/Permission/5
        //[HttpGet("{id}",Name="Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpGet]
        [Route("GetGroups/{email}")]
        public IEnumerable<UserGroups> GetGroups(string email)
        {

            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            int id =  db.Users.Where(b => b.Email == email).SingleOrDefault().InstituteId;
            return db.UserGroups.Where(b=>b.InstituteId == id).ToList();
        }

        [HttpGet]
        [Route("GetUsers/{email}")]
        public IEnumerable<UserViewModel> GetUsers(string email)
        {
            //string name;
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
           
            List<UserViewModel> lst = new List<UserViewModel>();
            int id = db.Users.Where(b => b.Email == email).SingleOrDefault().InstituteId;
            foreach(Users u in db.Users)
            {
                if(u.InstituteId == id)
                {
                    UserViewModel obj = new UserViewModel();
                    obj.name = u.FirstName + ' ' + u.LastName + '(' + u.Email + ')';
                   // obj.name = u.FirstName;
                    obj.id = u.Id;
                    lst.Add(obj);
                }
            }
            return lst;
        }

        [HttpPost]
        [Route("AssignGroups")]
        public IActionResult AssignGroups(AssignedGroupsViewModel obj)
        {
            List<string> UsersList = new List<string>();
            UsersList = obj.Users.Split(' ').ToList();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            for(int i = 1; i< UsersList.Count; i++)
            {
                UserAssignedGroups g = new UserAssignedGroups();
                g.UserId = Convert.ToInt32(UsersList[i]);
                g.UserGroupId = db.UserGroups.Where(b => b.Name == obj.group).SingleOrDefault().Id;
                if(db.UserAssignedGroups.Any(b=>b.UserId == g.UserId && b.UserGroupId == g.UserGroupId))
                {
                    ModelState.AddModelError("", "This User already assigned to that group");
                    break;
                }
                db.Add(g);
            }
            db.SaveChanges();
            return Ok();
        }

        // POST: api/Permission
        [HttpPost]
       
        public IActionResult Post([FromBody] GroupsPermissionsViewModel obj)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            List<string> permissionLst = new List<string>();
            //permissionLst = obj.Name.Split(' ').ToList();
            UserGroups u = new UserGroups();
            u.Name = obj.group;
            u.InstituteId = db.Users.Where(a => a.Email == obj.Email).SingleOrDefault().InstituteId;
            db.Add(u);
            db.SaveChanges();
           
            permissionLst = obj.Name.Split(' ').ToList();
            for(int i = 1; i<permissionLst.Count; i++)
            {
                GroupsAssignedPermissions p = new GroupsAssignedPermissions();
                p.PermissionId = db.PermissionLookup.Where(b => b.Name == permissionLst[i]).SingleOrDefault().Id;
                p.UserGroupId = db.UserGroups.Where(b => b.Name == obj.group).SingleOrDefault().Id;
                db.Add(p);
            }
            db.SaveChanges();
            return Ok();
        }

        // PUT: api/Permission/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
