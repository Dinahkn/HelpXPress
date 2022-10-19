using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
using HelpProjectServer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace HelpProjectServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly CityService _service;
        public CityController(CityService service)
        {
            _service = service;
        }
        [Route("getCity/{id?}")]
        [HttpGet]
        public ActionResult getCity(int id = 0)
        {
            if (id < 1)
            {
                List<CityDTO> result = _service.GetCities();
                return Ok(result);
            }
            CityDTO result2 = _service.GetCity(id);
            return Ok(result2);
        }

        [HttpPost]
        [Route("addCity")]
        [Authorize(Roles ="Admin")]
        public ActionResult addCity([FromBody] CityDTO city)
        {
            if (city == null || string.IsNullOrEmpty(city.CityName))
                return BadRequest("שדה שם הינו חובם");
            bool Ok = _service.AddCity(city);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add city to db");
        }

        [Route("updateCity/{id}")]
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public ActionResult updateCity(int id, [FromBody] CityDTO city)
        {
            ResponseDTO res = _service.UpdateCity(id,city);
            return Ok(res);
        }

        [Route("deleteCity/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public ActionResult deleteCity(int id)
        {
            ResponseDTO res = _service.DeleteCity(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
