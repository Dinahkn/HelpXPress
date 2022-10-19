using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
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
    public class NeedTeachersController : ControllerBase
    {
        private readonly NeedTeachersService _service;

        /*תקציר
        //בנאי
        //קבלת רשימה חיפושים מורה פרטי
        //קבלת רשימה חיפושים מורים פרטי לפי משתמש
        //הוספה חיפוש מורה פרטי
        //עדכון חיפוש מורה פרטי
        //מחיקה חיפוש מורה פרטי
        */

        //בנאי
        public NeedTeachersController(NeedTeachersService service)
        {
            _service = service;
        }

        //קבלת רשימה חיפושים מורה פרטי
        [HttpGet]
        [Route("getNeedTeacher/{id?}")]
        public ActionResult getNeedTeacher(int id = 0)
        {
            if (id < 1)
            {
                List<NeedTeachersDTO> result = _service.GetNeedTeachers();
                return Ok(result);
            }
            NeedTeachersDTO result2 = _service.GetNeedTeacher(id);
            return Ok(result2);
        }

        //קבלת רשימה חיפושים מורים פרטי לפי משתמש
        [Route("getNeedTeacherByUserID")]
        [Authorize(Roles = "User")]
        public ActionResult getNeedTeacherByUserID([FromQuery] int userID)
        {
            List<NeedTeachersDTO> result = _service.GetNeedTeachersByUserID(userID);
            return Ok(result);
        }

        //הוספה חיפוש מורה פרטי
        [HttpPost]
        [Route("addNeedTeacher")]
        [Authorize(Roles = "User")]
        public ActionResult addNeedTeacher([FromBody] NeedTeachersDTO teacher)
        {
            if (teacher == null)
                return BadRequest("שדות הינו חובם");
            bool Ok = _service.AddNeedTeacher(teacher);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add teacher to db");
        }

        //עדכון חיפוש מורה פרטי
        [Route("updateNeedTeacher/{id}")]
        [HttpPut]
        [Authorize(Roles = "User")]
        public ActionResult updateNeedTeacher(int id, [FromBody] NeedTeachersDTO teacher)
        {
            ResponseDTO res = _service.UpdateNeedTeacher(id, teacher);
            return Ok(res);
        }

        //מחיקה חיפוש מורה פרטי
        [Route("deleteNeedTeacher/{id}")]
        [HttpDelete]
        [Authorize(Roles = "User")]
        public ActionResult deleteNeedTeacher(int id)
        {
            ResponseDTO res = _service.DeleteNeedTeacher(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
