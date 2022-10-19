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

namespace ProjetServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelpCategoryController : ControllerBase
    {
        private readonly HelpCategoryService _service;
        public HelpCategoryController(HelpCategoryService service)
        {
            _service = service;
        }
        [Route("getCategories/{id?}")]
        [HttpGet]
        public ActionResult getHelpCategory(int id = 0)
        {
            if (id < 1)
            {
                List<HelpCategory> result = _service.GetHelpCategories();
                return Ok(result);
            }
            HelpCategory result2 = _service.GetHelpCategory(id);
            return Ok(result2);
        }

        [HttpPost]
        [Route("addCategory")]
        [Authorize(Roles = "Admin")]
        public ActionResult addHelpCategory([FromBody] HelpCategoryDTO category)
        {
            if (category == null || string.IsNullOrEmpty(category.NameHelp))
                return BadRequest("שדה שם הינו חובם");
            bool Ok = _service.AddCategory(category);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add category to db");
        }
    }
}
