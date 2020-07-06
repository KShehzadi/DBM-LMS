using DBM.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DBM.ViewModels
{
    public class UserRegistrationViewModel : IdentityUser
    {
        //[Column(TypeName = "nvarchar(150)")]
        //public string FullName { get; set; }

        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string RegistrationNumber { get; set; }

        public string Cnic { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Designation { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string InstituteName { get; set; }

        public int LoginStatus { get; set; }

        public int ActiveStatue { get; set; }

        public int InstituteId { get; set; }


        public bool EmailAlreadyExists(string email, string designation)
        {
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            //DBMContext db = new DBMContext();
            Users u = db.Users.Where(u1 => (u1.Email == email && u1.Designation == designation)).FirstOrDefault();
            if (u != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    
}
