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
    public class UsersController : ControllerBase
    {
        //קורא לשירות של המשתמש
        private readonly UsersService _service;
        //קורא לשירות של שליחת מיילים
        private readonly ContactService _contactService;

        /*תקציר
        //בנאי
        //שולח מייל בצרו קשר
        ///איפוס סיסמה
        //שולח מייל לקבלת קישור לאיפוס סיסמה
        //שולח מייל אחרי איפוס סיסמה
        //הזדהות וקבלת טוקן
        //JWT מקבל משתמש על פי
        //הוספת משתמש 
        //הוספת אדמין - מוגבל לאדמין
        //קבלת רשימת משתמשים או קבלת משתמש לי מזהה
        //עדכון משתמש
        //מחיקת משתמש - מוגבל לאדמין
        */

        //בנאי
        public UsersController(UsersService service, ContactService contactService)
        {
            _service = service;
            _contactService = contactService;
        }

        //שולח מייל בצרו קשר
        [Route("contactUs")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult sendContactUsMail([FromBody] ContactFormDTO contactForm)
        {
            try
            {
                ResponseDTO res = _contactService.SendContactUs(contactForm);
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //איפוס סיסמה
        //שולח מייל לקבלת קישור לאיפוס סיסמה
        [Route("forgetPassword")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult sendEmailForgetPassword([FromBody] ForgotPasswordDTO to)
        {
            try
            {
                ResponseDTO res= _service.ForgetPassword(to);
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //שולח מייל אחרי איפוס סיסמה
        [Route("resetPassword")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult SendEmailAfterResetPassword([FromBody] ResetPasswordDTO newPass)
        {
            try
            {
                ResponseDTO res=_service.ResetPassword(newPass);
                return Ok(res);
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        //הזדהות וקבלת טוקן
        [Route("login")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Auth([FromBody] AuthRequestDTO request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest("יש להזין אימל וסיסמה");
            Users UserFoundinDb = _service.GetUserForLogin(request.Email, request.Password);
            if (UserFoundinDb != null)
            {
                _service.UpdateLastLogin(UserFoundinDb);
                string token = _service.GetToken(UserFoundinDb.IDUser.ToString(), UserFoundinDb.RoleUser);
                return Ok(token);
            }
            return Unauthorized("משתמש לא מזוהה במערכת");
        }

        //JWT מקבל משתמש על פי
        [Authorize(Roles ="Admin,User")]
        [Route("getByJWT")]
        [HttpGet]
        public ActionResult getUserByJWT()
        {
            Users getUserByJWT= _service.GetUserByJWT();
            return Ok(getUserByJWT);
        }

        //הוספת משתמש 
        [Route("addUser")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult addUser([FromBody] UsersDTO user)
        {
            if (user == null || string.IsNullOrEmpty(user.Mail) || string.IsNullOrEmpty(user.Pswd))
                return BadRequest("שדות אימייל וסיסמה הינם חובם");
            if (_service.GetUserByMail(user.Mail))
                return BadRequest("משתמש כבר קיים");
            bool Ok = _service.AddUser(user);
            if (Ok)
                return Created("", null);
            throw new Exception("Problem when trying add user to db");
        }

        //הוספת אדמין - מוגבל לאדמין
        [Authorize(Roles ="Admin")]
        [Route("addAdmin")]
        public ActionResult addAdmin([FromBody] UsersDTO admin)
        {
            if (admin == null || string.IsNullOrEmpty(admin.Mail) || string.IsNullOrEmpty(admin.Pswd))
                return BadRequest("שדות אימייל וסיסמה הינם חובם");
            if (_service.GetUserByMail(admin.Mail))
                return BadRequest("משתמש כבר קיים");
            bool Ok = _service.AddAdmin(admin);
            if (Ok)
                return Created("", null);
            throw new Exception("Problem when trying add user to db");
        }

        //קבלת רשימת משתמשים או קבלת משתמש לי מזהה
       // [Authorize(Roles = "Admin,User")]
        [Route("getUsers/{id?}")]
        [HttpGet]  
        public ActionResult getUser(int id = 0)
        {
            if (id < 1)
            {
                List<UsersDTO> result = _service.GetUsers();
                return Ok(result);
            }          
            UsersDTO result2 = _service.GetUserToShow(id);
            return Ok(result2);           
        }

        //עדכון משתמש
        [Authorize(Roles ="Admin,User")]
        [Route("updateUser/{id}")]
        [HttpPut]
        public ActionResult updateUser(int id,[FromBody] UsersDTO user)
        {
            ResponseDTO res = _service.UpdateUser(id,user);
            return Ok(res);
        }

        //מחיקת משתמש - מוגבל לאדמין
        [Authorize(Roles = "Admin")]
        [Route("deleteUser/{id}")]
        [HttpDelete]
        public ActionResult deleteUser(int id)
        {
            ResponseDTO res = _service.DeleteUser(id);
            if (res.Status == Data.DTO.StatusCode.Error)
                return BadRequest(res);
            else
                return Ok(res);
        }
        
    }
}
