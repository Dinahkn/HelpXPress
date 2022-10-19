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
    public class NeedCarpoolController : ControllerBase
    {
        private readonly NeedCarpoolService _service;
        /*תקציר
        //בנאי
        //קבלת רשימה חיפושים נסיעה משותפת
        //קבלת רשימה חיפושים נסיעה משותפת לפי משתמש
        //הוספה חיפוש נסיעה משותפת
        //עדכון חיפוש נסיעה משותפת
        //מחיקה חיפוש נסיעה משותפת
        */

        //בנאי
        public NeedCarpoolController(NeedCarpoolService service)
        {
            _service = service;
        }

        //קבלת רשימה חיפושים נסיעה משותפת
        [HttpGet]
        [Route("getNeedCarpool/{id?}")]
        public ActionResult getNeedCarpool(int id = 0)
        {
            if (id < 1)
            {
                List<NeedCarpoolsDTO> result = _service.GetNeedCarpools();
                return Ok(result);
            }
            NeedCarpoolsDTO result2 = _service.GetNeedCarpool(id);
            return Ok(result2);
        }
        //קבלת רשימה חיפושים נסיעה משותפת לפי משתמש
        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("getNeedCarpoolByUserID")]
        public ActionResult getNeedCarpoolByUserID([FromQuery] int userID)
        {
            List<NeedCarpoolsDTO> result = _service.GetNeedCarpoolByUserID(userID);
            return Ok(result);
        }

        //הוספה חיפוש נסיעה משותפת
        [HttpPost]
        [Route("addNeedCarpool")]
        [Authorize(Roles = "User")]
        public ActionResult addNeedCarpool([FromBody] NeedCarpoolsDTO carpool)
        {
            if (carpool == null)
                return BadRequest("שדות הינו חובם");
            bool Ok = _service.AddNeedCarpool(carpool);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add shared travel to db");
        }

        //עדכון חיפוש נסיעה משותפת
        [Route("updateNeedCarpool/{id}")]
        [Authorize(Roles = "User")]
        [HttpPut]
        public ActionResult updateNeedCarpool(int id, [FromBody] NeedCarpoolsDTO carpool)
        {
            ResponseDTO res = _service.UpdateNeedCarpool(id, carpool);
            return Ok(res);
        }

        //מחיקה חיפוש נסיעה משותפת
        [Route("deleteNeedCarpool/{id}")]
        [Authorize(Roles = "User")]
        [HttpDelete]
        public ActionResult deleteNeedCarpool(int id)
        {
            ResponseDTO res = _service.DeleteNeedCarpool(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
