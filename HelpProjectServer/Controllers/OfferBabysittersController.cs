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
    public class OfferBabysittersController : ControllerBase
    {
        private readonly OfferBabysittersService _service;
        /*תקציר
        //בנאי
        //קבלת רשימה הצעות בייביסיטר לפי עיר
        //קבלת רשימה הצעות בייביסיטר לפי עיר ותאריך
        //קבלת רשימה הצעות בייביסיטר
        //קבלת רשימה הצעות בייביסיטר לפי מספר משתמש
        //הוספת הצעת בייביסיטר
        //עדכון הצעת בייביסיטר
        //מחיקת הצעת בייביסיטר
        */

        //בנאי
        public OfferBabysittersController(OfferBabysittersService service)
        {
            _service = service;
        }
        
        //קבלת רשימה הצעות בייביסיטר לפי עיר
        [HttpGet]
        [Route("getOfferBabysitterCity")]
        public ActionResult getOfferBabysitterCity([FromQuery] int cityID)
        {
            List<OfferBabysittersDTO> result = _service.GetOfferBabysittersByCity(cityID);
            return Ok(result);
        }
        //קבלת רשימה הצעות בייביסיטר לפי עיר ותאריך
        [HttpGet]
        [Route("getOfferBabysitterByDateCity")]
        public ActionResult getOfferBabysitterByDateCity([FromQuery] DateTime date, [FromQuery] int cityID)
        {
            List<OfferBabysittersDTO> result = _service.GetOfferBabysitterByDateAndCity(date,cityID);
            return Ok(result);
        }
        
        //קבלת רשימה הצעות בייביסיטר
        [HttpGet]
        [Route("getOfferBabysitter/{id?}")]
        public ActionResult getOfferBabysitter(int id = 0)
        {
            if (id < 1)
            {
                List<OfferBabysittersDTO> result = _service.GetOfferBabysitters();
                return Ok(result);
            }
            OfferBabysittersDTO result2 = _service.GetOfferBabysitter(id);
            return Ok(result2);
        }

        //קבלת רשימה הצעות בייביסיטר לפי מספר משתמש
        [HttpGet]
        [Route("getOfferBabysitterByUserID")]
        [Authorize(Roles = "User")]
        public ActionResult getOfferBabysitterByUserID([FromQuery] int userID)
        {
            List<OfferBabysittersDTO> result = _service.GetOfferBabysitterByUserID(userID);
            return Ok(result);
        }

        //הוספת הצעת בייביסיטר
        [HttpPost]
        [Route("addOfferBabysitter")]
        [Authorize(Roles = "User")]
        public ActionResult addOfferBabysitter([FromBody] OfferBabysittersDTO babysitter)
        {
            if (babysitter == null)
                return BadRequest("שדות הינו חובם");
            bool Ok = _service.AddOfferBabysitter(babysitter);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add babysitter to db");
        }

        //עדכון הצעת בייביסיטר
        [Authorize(Roles = "User")]
        [Route("updateOfferBabysitter/{id}")]
        [HttpPut]
        public ActionResult updateOfferBabysitter(int id, [FromBody] OfferBabysittersDTO bbsit)
        {
            ResponseDTO res = _service.UpdateOfferBabysitter(id, bbsit);
            return Ok(res);
        }

        //מחיקת הצעת בייביסיטר
        [Authorize(Roles = "User")]
        [Route("deleteOfferBabysitter/{id}")]
        [HttpDelete]
        public ActionResult deleteOfferBabysitter(int id)
        {
            ResponseDTO res = _service.DeleteOfferBbsit(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
