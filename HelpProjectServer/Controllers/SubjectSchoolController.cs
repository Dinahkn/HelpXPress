using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Services
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectSchoolController : ControllerBase
    {
        private readonly SubjectSchoolService _service;
        public SubjectSchoolController(SubjectSchoolService service)
        {
            _service = service;
        }
        [Route("getSubjectSchool/{id?}")]
        [HttpGet]
        public ActionResult getSubjects(int id = 0)
        {
            if (id < 1)
            {
                List<SubjectSchool> result = _service.GetSubjects();
                return Ok(result);
            }
            SubjectSchool result2 = _service.GetSubject(id);
            return Ok(result2);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("addSubjectSchool")]
        public ActionResult addSubjectSchool([FromBody] SubjectSchoolDTO subj)
        {
            if (subj == null || string.IsNullOrEmpty(subj.NameSubject))
                return BadRequest("שדה שם הינו חובם");
            bool Ok = _service.AddSubject(subj);
            if (Ok)
                return Created("", null);
            throw new Exception("problem when trying add subject school to db");
        }

        [Route("updateSubjectSchool/{id}")]
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public ActionResult updateSubjectSchool(int id, [FromBody] SubjectSchoolDTO subject)
        {
            ResponseDTO res = _service.UpdateSubject(id, subject);
            return Ok(res);
        }

        [Route("deleteSubjectSchool/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public ActionResult deleteSubjectSchool(int id)
        {
            ResponseDTO res = _service.DeleteSubject(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
    }
}
