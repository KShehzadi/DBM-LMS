using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DBM.Models;
using DBM.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;

        public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }
        // GET: api/Users
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Users/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Users

        [HttpPost]
        [Route("Register")]
        public async Task<Object> Post(UserModel model)
        {
            model.UserName = model.Email;
            model.FullName = model.FirstName + model.LastName;
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName,
            };

            var result = await _userManager.CreateAsync(applicationUser, model.Password);
            await _userManager.AddToRoleAsync(applicationUser, model.Designation);
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            // DBMContext db = new DBMContext();
            UserRegistrationViewModel users = new UserRegistrationViewModel();
            if (users.EmailAlreadyExists(model.Email, model.Designation))
            {
                ModelState.AddModelError("EmailAddress", "This email already exists for this designation.");
                return BadRequest(ModelState);
            }
            Users u = new Users();
            u.FirstName = model.FirstName;
            u.LastName = model.LastName;
            u.RegNo = model.RegistrationNumber;
            u.Cnic = model.Cnic;
            u.Email = model.Email;
            u.Password = model.Password;
            u.DateOfBirth = model.DateOfBirth;
            u.Designation = model.Designation;
            u.LoginStatus = 0;
            u.ActiveStatue = 1;
            u.InstituteId = db.Institute.Where(p => p.Name.Equals(model.InstituteName)).FirstOrDefault().Id;
            db.Users.Add(u);
            //db.Users.Add(users);
            db.SaveChanges();

            return Ok(result);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {

            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    // Get role assigned to user
                    var role = await _userManager.GetRolesAsync(user);
                    IdentityOptions _options = new IdentityOptions();

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                        }),
                        Expires = DateTime.UtcNow.AddMinutes(5),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
                    var id = db.Users.Where(t => t.Email == model.Email).FirstOrDefault().Id;
                    return Ok(new { token, id });
                }
                else
                {
                    return BadRequest(new { message = "Email or Password is incorrect" });
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
           
        }
        [HttpPost]
        public IActionResult Post([FromBody] UserRegistrationViewModel users)
        {
            //users.InstituteId = 1;
            // DBMContext db = new DBMContext();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            if (users.EmailAlreadyExists(users.Email, users.Designation))
            {
                ModelState.AddModelError("EmailAddress", "This email already exists for this designation.");
                return BadRequest(ModelState);
            }
            Users u = new Users();
            u.FirstName = users.FirstName;
            u.LastName = users.LastName;
            u.RegNo = users.RegistrationNumber;
            u.Cnic = users.Cnic;
            u.Email = users.Email;
            u.Password = users.Password;
            u.DateOfBirth = users.DateOfBirth;
            u.Designation = users.Designation;
            u.LoginStatus = 0;
            u.ActiveStatue = 1;
            u.InstituteId = db.Institute.Where(p => p.Name.Equals(users.InstituteName)).FirstOrDefault().Id;
            db.Users.Add(u);
            //db.Users.Add(users);
            db.SaveChanges();
            return Ok();
        }

        //[HttpGet]
        //public List<string> getInstitutes()
        //{
        //    DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
        //    // DBMContext db = new DBMContext();
        //    List<string> s = new List<string>();
        //    foreach (Institute i in db.Institute)
        //    {
        //        s.Add(i.Name);
        //    }
        //    return s;
        //}

        [HttpGet]
        public IEnumerable<Institute> get()
        {
            List<Institute> institutes = new List<Institute>();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            //DBMContext db = new DBMContext();
            foreach (Institute i in db.Institute)
            {
                institutes.Add(i);
            }
            return institutes;
        }

        // PUT: api/Users/5
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
