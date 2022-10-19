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
    public class LevelsController : ControllerBase
    {
        private readonly LevelsService _service;
        public LevelsController(LevelsService service)
        {
            _service = service;
        }
        [Route("getLevels/{id?}")]
        [HttpGet]
        public ActionResult getLevels(int id = 0)
        {
            if (id < 1)
            {
                List<Levels> result = _service.GetLevels();
                return Ok(result);
            }
            Levels result2 = _service.GetLevel(id);
            return Ok(result2);
        }

        [HttpPost]
        [Route("addLevel")]
        [Authorize(Roles = "Admin")]
        public ActionResult addLevel([FromBody] LevelsDTO level)
        {
            if (level == null || string.IsNullOrEmpty(level.NameLevel))
                return BadRequest("שדה שם הינו חובם");
            bool Ok = _service.AddLevel(level);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add level to db");
        }

        [Route("updateLevel/{id}")]
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public ActionResult updateLevel(int id, [FromBody] LevelsDTO level)
        {
            ResponseDTO res = _service.UpdateLevel(id, level);
            return Ok(res);
        }

        [Route("deleteLevel/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public ActionResult deleteLevel(int id)
        {
            ResponseDTO res = _service.DeleteLevel(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
