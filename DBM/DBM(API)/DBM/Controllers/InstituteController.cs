using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBM.Models;
using DBM.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DBM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstituteController : ControllerBase
    {
        // GET: api/Institute
        [HttpGet]
        public List<InstitutesViewModel> Get()
        {
            //List<Institute> institutes = new List<Institute>();
            //DBMContext db = new DBMContext();
            //institutes = db.Institute.ToList();
            //return institutes;

            //DBMContext db = new DBMContext();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            List<InstitutesViewModel> lstInstitutes = new List<InstitutesViewModel>();
            foreach (Institute i in db.Institute)
            {
                InstitutesViewModel ins = new InstitutesViewModel();
                ins.Id = i.Id;
                ins.InstituteName = i.Name;
                lstInstitutes.Add(ins);
            }
            return lstInstitutes;
        }



        // // GET: api/Institute/5
        // [HttpGet("{id}", Name = "Get")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // //POST: api/Institute
        [HttpPost]
        public IActionResult Post([FromBody] InstitutesViewModel institute)
        {

            //DBMContext db = new DBMContext();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            Institute i = new Institute();
            if (db.Institute.Any(b => b.Name == institute.InstituteName))
            {
                ModelState.AddModelError("UniqueInstituteName", "This Institute already exists");
                return BadRequest(ModelState);
            }
            i.Name = institute.InstituteName;
            db.Institute.Add(i);
            db.SaveChanges();
            return Ok();
        }

        // // PUT: api/Institute/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] InstitutesViewModel institutes)
        {
            //DBMContext db = new DBMContext();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();
            foreach (Institute i in db.Institute)
            {
                if (i.Name == institutes.InstituteName && i.Id != id)
                {
                    ModelState.AddModelError("UniqueInstituteName", "This Institute already exists");
                    return BadRequest(ModelState);
                }
            }
            db.Institute.Where(b => b.Id == id).FirstOrDefault().Name = institutes.InstituteName;
            db.SaveChanges();
            return Ok();
        }

        // // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //DBMContext db = new DBMContext();
            DigitalBoardMarkerContext db = new DigitalBoardMarkerContext();

            if (!db.Institute.Any(b => b.Id == id))
            {
                ModelState.AddModelError("", "Institute at this id doesn't exist");
                return BadRequest(ModelState);
            }
            Institute i = db.Institute.Single(b => b.Id == id);
            db.Institute.Remove(i);
            db.SaveChanges();
            return Ok();
        }

    }
}
