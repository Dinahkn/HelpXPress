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
    public class NeedBabysittersController : ControllerBase
    {
        private readonly NeedBabysittersService _service;
        /*תקציר
        //בנאי
        //קבלת רשימה חיפושים בייביסיטר
        //קבלת רשימה חיפושים בייביסיטר לפי משתמש
        //הוספה חיפוש בייביסיטר
        //עדכון חיפוש בייביסיטר
        //מחיקה חיפוש בייביסיטר
        */

        //בנאי
        public NeedBabysittersController(NeedBabysittersService service)
        {
            _service = service;
        }

        //קבלת רשימה חיפושים בייביסיטר
        [HttpGet]
        [Route("getNeedBabysitter/{id?}")]
        public ActionResult getNeedBabysitter(int id = 0)
        {
            if (id < 1)
            {
                List<NeedBabysittersDTO> result = _service.GetNeedBabysitters();
                return Ok(result);
            }
            NeedBabysittersDTO result2 = _service.GetNeedBabysitter(id);
            return Ok(result2);
        }

        //קבלת רשימה חיפושים בייביסיטר לפי משתמש
        [HttpGet]
        [Route("getNeedBabysitterByUserID")]
        [Authorize(Roles = "User")]
        public ActionResult getNeedBabysitterByUserID([FromQuery] int userID)
        {
            List<NeedBabysittersDTO> result = _service.GetNeedBabysitterByUserID(userID);
            return Ok(result);
        }

        //הוספה חיפוש בייביסיטר
        [Authorize(Roles = "User")]
        [HttpPost]
        [Route("addNeedBabysitter")]
        public ActionResult addNeedBabysitter([FromBody] NeedBabysittersDTO babysitter)
        {
            if (babysitter == null)
                return BadRequest("שדות הינו חובם");
            bool Ok = _service.AddNeedBabysitter(babysitter);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add babysitter to db");
        }

        //עדכון חיפוש בייביסיטר
        [Authorize(Roles = "User")]
        [Route("updateNeedBabysitter/{id}")]
        [HttpPut]
        public ActionResult updateNeedBabysitter(int id, [FromBody] NeedBabysittersDTO bbsit)
        {
            ResponseDTO res = _service.UpdateNeedBabysitter(id, bbsit);
            return Ok(res);
        }

        //מחיקה חיפוש בייביסיטר
        [Authorize(Roles = "User")]
        [Route("deleteNeedBabysitter/id")]
        [HttpDelete]
        public ActionResult deleteNeedBabysitter(int id)
        {
            ResponseDTO res = _service.DeleteNeedBbsit(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
