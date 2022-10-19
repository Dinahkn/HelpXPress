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
    public class OfferCarpoolController : ControllerBase
    {
        private readonly OfferCarpoolService _service;
        /*תקציר
        //בנאי
        //קבלת רשימה הצעות נסיעות משותפות לפי ערים
        //קבלת רשימה הצעות נסיעות משותפות לפי ערים ותאריך
        //קבלת רשימה הצעות נסיעות משותפות
        //קבלת רשימה הצעות נסיעות משותפות לפי משתמש
        //הוספה הצעה נסיעות משותפות 
        //עדכון הצעה נסיעות משותפות 
        //מחיקה הצעה נסיעות משותפות 
        */

        //בנאי
        public OfferCarpoolController(OfferCarpoolService service)
        {
            _service = service;
        }

        //קבלת רשימה הצעות נסיעות משותפות לפי ערים
        [HttpGet]
        [Route("cities")]
        public ActionResult getOfferCarpoolsByCities([FromQuery] int cityD, [FromQuery] int cityA)
        {
            List<OfferCarpoolsDTO> result = _service.GetOfferCarpoolByCities(cityD, cityA);
            return Ok(result);
        }

        //קבלת רשימה הצעות נסיעות משותפות לפי ערים ותאריך
        [HttpGet]
        [Route("citiesAndDate")]
        public ActionResult getOfferCarpoolByCitiesDate([FromQuery] int cityD, [FromQuery] int cityA, [FromQuery] DateTime date)
        {
            List<OfferCarpoolsDTO> result = _service.GetOfferCarpoolByCitiesDate(cityD, cityA, date);
            return Ok(result);
        }

        //קבלת רשימה הצעות נסיעות משותפות
        [HttpGet]
        [Route("getOfferCarpool/{id?}")]
        public ActionResult getOfferCarpool(int id = 0)
        {
            if (id < 1)
            {
                List<OfferCarpoolsDTO> result = _service.GetOfferCarpools();
                return Ok(result);
            }
            OfferCarpoolsDTO result2 = _service.GetOfferCarpool(id);
            return Ok(result2);
        }

        //קבלת רשימה הצעות נסיעות משותפות לפי משתמש
        [Authorize(Roles = "User")]
        [Route("getOfferCarpoolByUserID")]
        public ActionResult getOfferCarpoolByUserID(int userID)
        {
            List<OfferCarpoolsDTO> result = _service.GetOfferCarpoolByUserID(userID);
            return Ok(result);
        }

        //הוספה הצעה נסיעות משותפות 
        [HttpPost]
        [Authorize(Roles = "User")]
        [Route("addOfferCarpool")]
        public ActionResult addOfferCarpool([FromBody] OfferCarpoolsDTO carpool)
        {
            if (carpool == null)
                return BadRequest("שדות הינו חובם");
            bool Ok = _service.AddOfferCarpool(carpool);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add shared travel to db");
        }

        //עדכון הצעה נסיעות משותפות 
        [Route("updateOfferCarpool/{id}")]
        [HttpPut]
        [Authorize(Roles = "User")]
        public ActionResult updateOfferCarpool(int id, [FromBody] OfferCarpoolsDTO carpool)
        {
            ResponseDTO res = _service.UpdateOfferCarpool(id, carpool);
            return Ok(res);
        }

        //מחיקה הצעה נסיעות משותפות 
        [Route("deleteOfferCarpool/{id}")]
        [HttpDelete]
        [Authorize(Roles = "User")]
        public ActionResult deleteOfferCarpool(int id)
        {
            ResponseDTO res = _service.DeleteOfferCarpool(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
