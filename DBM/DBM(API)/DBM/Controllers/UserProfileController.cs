using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBM.Models;
using DBM.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;

        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        [Route("GetUserProfile")]
        public async Task<Object> GetUSerProfile()
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            int tempId = db.Users.Where(u => u.Email == user.Email).FirstOrDefault().Id;
            //user.Id = Convert.ToString(tempId);
            return new
            {
                tempId,
                user.FullName,
                user.Email,
                user.UserName
            };
        }

        [HttpGet]
        [Route("RoleDetails/{id}")]
        public List<UserRegistrationViewModel> GetUserRoleDetails(int? id)
        {
            
            List<UserRegistrationViewModel> lst = new List<UserRegistrationViewModel>();

            if (id != 0)
            {
                DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
                string designantion = db.Users.Where(u => u.Id == id).FirstOrDefault().Designation;
                //user.Id = Convert.ToString(tempId);

                UserRegistrationViewModel u1 = new UserRegistrationViewModel();
                u1.Designation = designantion;
                lst.Add(u1);
            }
            return lst;
        }


        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public string GetForAdmin()
        {
            return "web method for Admin";
        }


        [HttpGet]
        [Authorize(Roles = "Teacher")]
        [Route("ForTeacher")]
        public string GetForTeacher()
        {
            return "web method for Teacher";
        }

        [HttpGet]
        [Authorize(Roles = "Student")]
        [Route("ForStudent")]
        public string GetForStudent()
        {
            return "web method for Student";
        }


        [HttpGet]
        [Authorize(Roles = "Admin,Teacher")]
        [Route("ForAdminOrTeacher")]
        public string GetForAdminOrTeacher()
        {
            return "web method for Admin or Teacher";
        }


        [HttpGet]
        [Authorize(Roles = "Teacher,Student")]
        [Route("ForTeacherOrStudent")]
        public string GetForTeacherOrStudent()
        {
            return "web method for Teacher or Student";
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Teacher,Student")]
        [Route("ForAdminOrTeacherOrStudent")]
        public string GetForAdminOrTeacherOrStudent()
        {
            return "web method for Admin or Teacher or Student";
        }

    }
}