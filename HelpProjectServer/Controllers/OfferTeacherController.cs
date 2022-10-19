using HelpProjectServer.Data.DTO;
using HelpProjectServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferTeacherController : ControllerBase
    {
        private readonly OfferTeachersService _service;
        /*תקציר
        //בנאי
        //קבלת רשימה לפי עיר,מקצוע וכיתה
        //קבלת רשימה לפי עיר,מקצוע 
        //קבלת רשימה לפי מקצוע וכיתה
        //קבלת רשימה לפי עיר וכיתה
        //קבלת רשימה לפי עיר
        //קבלת רשימה לפי מקצוע 
        //קבלת רשימה לפי כיתה
        //קבלת רשימה הצעות מורים פרטיים
        //קבלת רשימה הצעות מורים פרטיים לפי מספר מזהה משתמש
        //הוספת הצעת מורה פרטי
        //עדכון הצעת מורה פרטי
        //מחיקת הצעת מורה פרטי
         */

        //בנאי
        public OfferTeacherController(OfferTeachersService service)
        {
            _service = service;
        }
        
        //קבלת רשימה לפי עיר,מקצוע וכיתה
        [HttpGet]
        [Route("citySubjectLevel")]
        public ActionResult getOfferTeacherSubjectCity([FromQuery] int city, [FromQuery] int subject, [FromQuery] int level)
        {
            List<OfferTeachersDTO> result = _service.GetOfferTeacherSubjectCityLevel(city, subject, level);
            return Ok(result);
        }

        //קבלת רשימה לפי עיר,מקצוע 
        [Route("citySubject")]
        public ActionResult getOfferTeacherSubjectCity([FromQuery] int city, [FromQuery] int subject)
        {
            List<OfferTeachersDTO> result = _service.GetOfferTeacherSubjectCity(city, subject);
            return Ok(result);
        }
        //קבלת רשימה לפי מקצוע וכיתה
        [Route("subjectLevel")]
        public ActionResult getOfferTeacherSubjectLevel([FromQuery] int subject, [FromQuery] int level)
        {
            List<OfferTeachersDTO> result = _service.GetOfferTeacherSubjectLevel(subject, level);
            return Ok(result);
        }
        //קבלת רשימה לפי עיר וכיתה
        [Route("cityLevel")]
        public ActionResult getOfferTeacherCityLevel([FromQuery] int city, [FromQuery] int level)
        {
            List<OfferTeachersDTO> result = _service.GetOfferTeacherCityLevel(city, level);
            return Ok(result);
        }
        //קבלת רשימה לפי עיר
        [Route("city")]
        public ActionResult getOfferTeacherCity([FromQuery] int city)
        {
            List<OfferTeachersDTO> result = _service.GetOfferTeachersCity(city);
            return Ok(result);
        }
        //קבלת רשימה לפי מקצוע 
        [Route("subject")]
        public ActionResult getOfferTeacherSubject([FromQuery] int subject)
        {
            List<OfferTeachersDTO> result = _service.GetOfferTeacherSubject(subject);
            return Ok(result);
        }
        //קבלת רשימה לפי כיתה
        [Route("level")]
        public ActionResult getOfferTeacherLevel([FromQuery] int level)
        {
            List<OfferTeachersDTO> result = _service.GetOfferTeachersLevel(level);
            return Ok(result);
        }
        
        //קבלת רשימה הצעות מורים פרטיים
        [HttpGet]
        [Route("getOfferTeachers/{id?}")]
        public ActionResult getOfferTeachers(int id = 0)
        {
            if (id < 1)
            {
                List<OfferTeachersDTO> result = _service.GetAllOfferTeachers();
                return Ok(result);
            }
            OfferTeachersDTO result2 = _service.GetOfferTeacher(id);
            return Ok(result2);
        }

        //קבלת רשימה הצעות מורים פרטיים לפי מספר מזהה משתמש
        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("getOfferTeacherByUserID")]
        public ActionResult getOfferTeacherByUserID([FromQuery] int userID)
        {
            List<OfferTeachersDTO> result = _service.GetOfferTeachersByUserID(userID);
            return Ok(result);
        }

        //הוספת הצעת מורה פרטי
        [HttpPost]
        [Authorize(Roles = "User")]
        [Route("addOfferTeacher")]
        public ActionResult addOfferTeacher([FromBody] OfferTeachersDTO teacher)
        {
            if (teacher == null)
                return BadRequest("שדות הינו חובם");
            bool Ok = _service.AddOfferTeacher(teacher);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add teacher to db");
        }

        //עדכון הצעת מורה פרטי
        [Route("updateOfferTeacher/{id}")]
        [HttpPut]
        [Authorize(Roles = "User")]
        public ActionResult updateOfferTeacher(int id, [FromBody] OfferTeachersDTO teacher)
        {
            ResponseDTO res = _service.UpdateOfferTeacher(id, teacher);
            return Ok(res);
        }

        //מחיקת הצעת מורה פרטי
        [Route("deleteOfferTeacher/{id}")]
        [HttpDelete]
        [Authorize(Roles = "User")]
        public ActionResult deleteOfferTeacher(int id)
        {
            ResponseDTO res = _service.DeleteOfferTeacher(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
