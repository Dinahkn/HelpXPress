using HelpProjectServer.Data;
using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace HelpProjectServer.Services
{
    public class UsersService
    {
        private readonly HelpDBContext m_db;
        private readonly JwtService _jwtService;
        private readonly EmailConfigurationDTO _mailConfig;

        public UsersService(HelpDBContext db,JwtService jwt, IOptions<EmailConfigurationDTO> mailconf)
        {
            m_db = db;
            _jwtService = jwt;
            _mailConfig = mailconf.Value;
        }
        //Login functions
        public Users GetUserForLogin(string email, string password)
        {
            string passwordAfterMD5 = GetMD5(password);
            return m_db.Users
                .Where(user => user.Mail.ToLower() == email.ToLower() 
                && user.Pswd == passwordAfterMD5)
                .FirstOrDefault();
        }
        public string GetToken(string id,string role)
        {
            return _jwtService.GenerateToken(id,role);
        }
        public bool UpdateLastLogin(Users userFormController)
        {
            userFormController.LastConnectDate = DateTime.Now;
            int c = m_db.SaveChanges();
            return c > 0;
        }
        //get user by his jwt
        public Users GetUserByJWT()
        {
            string id = _jwtService.GetTokenClaims();
            return GetUser(int.Parse(id));
        }
        public List<UsersDTO> GetUsers()
        {
            return m_db.Users
                .Select(ee =>
                new UsersDTO()
                {
                    IDUser = ee.IDUser,
                    Mail = ee.Mail,
                    Pswd = ee.Pswd,
                    TZ = ee.TZ,
                    FullName = ee.FullName,
                    Phone = ee.Phone,
                    IDCity = ee.IDCity,
                    Latitude = ee.Latitude,
                    Longitude = ee.Longitude,
                    RoleUser = ee.RoleUser,
                    CreateDate = ee.CreateDate,
                    LastConnectDate = ee.LastConnectDate,
                    Comments = ee.Comments,
                    CityName = ee.City.CityName
                }).ToList();    
        }
        public Users GetUser(int id)
        {
            return m_db.Users
                .Where(user => user.IDUser == id).FirstOrDefault();

        }
        public UsersDTO GetUserToShow(int id)
        {
            return m_db.Users
                .Where(user => user.IDUser == id)
                .Select(ee =>
                new UsersDTO()
                {
                    IDUser = ee.IDUser,
                    Mail = ee.Mail,
                    Pswd = ee.Pswd,
                    TZ = ee.TZ,
                    FullName = ee.FullName,
                    Phone = ee.Phone,
                    IDCity = ee.IDCity,
                    Latitude = ee.Latitude,
                    Longitude = ee.Longitude,
                    RoleUser = ee.RoleUser,
                    CreateDate = ee.CreateDate,
                    LastConnectDate = ee.LastConnectDate,
                    Comments = ee.Comments,
                    CityName = ee.City.CityName
                }).FirstOrDefault();
        }
        public bool AddUser(UsersDTO user)
        {
            Users newUser = new Users();
            newUser.Mail = user.Mail;
            newUser.Pswd = GetMD5(user.Pswd);
            newUser.TZ = user.TZ;
            newUser.FullName = user.FullName;
            newUser.Phone = user.Phone;
            newUser.IDCity = user.IDCity;
            newUser.Latitude = user.Latitude;
            newUser.Longitude = user.Longitude;
            newUser.RoleUser = "User";
            newUser.CreateDate = DateTime.Now;
            newUser.LastConnectDate = DateTime.Now;
            newUser.Comments = newUser.Comments;
            m_db.Users.Add(newUser);
            int c = m_db.SaveChanges();
            if (c > 0)
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_mailConfig.UserName, _mailConfig.FromAdress));
                email.To.Add(MailboxAddress.Parse(user.Mail));
                email.Subject = "הרשמת בהצלחה!";
                var builder = new BodyBuilder();
                string htmlString = @"<html>
            <body dir=rtl>

            <p>נרשמת בהצלחה! ברוך הבא</p>
            <br>
            <p>לכל שאלה את/ה יכול/ה לפנות אלינו</p>
            <br>
            <p>יום טוב</p>
            <br>
            <p>צוות HelpXPress</p>
            </body>
            </html>
            ";
                builder.HtmlBody = htmlString;
                email.Body = builder.ToMessageBody();
                using var smtp = new SmtpClient();
                smtp.Connect(_mailConfig.SmtpServer, _mailConfig.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(_mailConfig.FromAdress, _mailConfig.Password);
                smtp.Send(email);
                smtp.Disconnect(true);
            }
            return c > 0;
        }
        public bool GetUserByMail(string mail)
        {
            Users userSubs = m_db.Users.Where(user => user.Mail == mail).FirstOrDefault();
            if (userSubs != null)
                return true;
            return false;
        }
        public bool AddAdmin(UsersDTO adm)
        {
            Users newUser = new Users();
            newUser.Mail = adm.Mail;
            newUser.Pswd = GetMD5(adm.Pswd);
            newUser.TZ = adm.TZ;
            newUser.FullName = adm.FullName;
            newUser.Phone = adm.Phone;
            newUser.IDCity = adm.IDCity;
            newUser.Latitude = adm.Latitude;
            newUser.Longitude = adm.Longitude;
            newUser.RoleUser = "Admin";
            newUser.CreateDate = DateTime.Now;
            newUser.LastConnectDate = DateTime.Now;
            newUser.Comments = newUser.Comments;
            m_db.Users.Add(newUser);
            int c = m_db.SaveChanges();
            return c > 0;
        }
        private string GetMD5(string input)
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(input));
                var strResult = BitConverter.ToString(result);
                return strResult.Replace("-", "");
            }
        }
        public Users getUserForDelUpd(int id)
        {
            return m_db.Users.Where(user => user.IDUser == id).FirstOrDefault();
        }
        public ResponseDTO UpdateUser(int id,UsersDTO userToUpdate)
        {
            Users userFromDB = getUserForDelUpd(id);
            ResponseDTO response = new ResponseDTO();
            if (userFromDB.IDUser != userToUpdate.IDUser)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"User {userToUpdate.FullName} with id:{userToUpdate.IDUser} not found in the database.";

            }
            userFromDB.Mail = userToUpdate.Mail;
            userFromDB.Pswd = GetMD5(userToUpdate.Pswd);
            userFromDB.TZ = userToUpdate.TZ;
            userFromDB.FullName = userToUpdate.FullName;
            userFromDB.Phone = userToUpdate.Phone;
            userFromDB.IDCity = userToUpdate.IDCity;
            userFromDB.Latitude = userToUpdate.Latitude;
            userFromDB.Longitude = userToUpdate.Longitude;
            userFromDB.Comments = userToUpdate.Comments;
            m_db.Users.Update(userFromDB);
            int c = m_db.SaveChanges();
            if (c > 0)
                response.Status = StatusCode.Success;
            else
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Failed when trying changes";
            }
            return response;
        }
        public ResponseDTO ForgetPassword(ForgotPasswordDTO forgotPasswordUser)
        {
            ResponseDTO response = new ResponseDTO();
            if (!GetUserByMail(forgotPasswordUser.Email))
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"User with the email is:{forgotPasswordUser.Email} not found in the database.";
            }
            else
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_mailConfig.UserName, _mailConfig.FromAdress));
                email.To.Add(MailboxAddress.Parse(forgotPasswordUser.Email));
                email.Subject = "Forget Password";
                var builder = new BodyBuilder();
                string htmlString = @"<html>
            <body dir=rtl>
            <p>קישור להגדרת סיסמה חדשה :
            <br>
            <a href='http://localhost:4200/ResetPassword'>לאפס סיסמה</a>
            <p>אם אתה צריך עזרה תיצור קשר איתנו</p>
            <p>צוות HelpXPress</p>
            </body>
            </html>
            ";
                builder.HtmlBody = htmlString;
                email.Body = builder.ToMessageBody();
                using var smtp = new SmtpClient();
                smtp.Connect(_mailConfig.SmtpServer, _mailConfig.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(_mailConfig.FromAdress, _mailConfig.Password);
                smtp.Send(email);
                smtp.Disconnect(true);
                response.Status = StatusCode.Success;
            }
            return response;
        }
        public ResponseDTO ResetPassword(ResetPasswordDTO resetPasswordUser)
        {

            ResponseDTO response = new ResponseDTO();
            if (!GetUserByMail(resetPasswordUser.Email))
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"User with the email is:{resetPasswordUser.Email} not found in the database.";
            }
            else
            {
                Users userFromDB = m_db.Users.Where(user => user.Mail == resetPasswordUser.Email).FirstOrDefault();
                userFromDB.Pswd = GetMD5(resetPasswordUser.Password);
                m_db.Users.Update(userFromDB);
                int c = m_db.SaveChanges();
                if (c > 0)
                {
                    var email = new MimeMessage();
                    email.From.Add(new MailboxAddress(_mailConfig.UserName, _mailConfig.FromAdress));
                    email.To.Add(MailboxAddress.Parse(resetPasswordUser.Email));
                    email.Subject = "Reset Password";
                    var builder = new BodyBuilder();
                    string htmlString = @"
                    <html>
                    <body dir=rtl>
                            <p>סיסמה חדשה הוקלטה!</p>
                            <br>
                            <p>יום טוב</p>
                            <br>
                            <p>צוות HelpXPress</p>
                        </body>
                    </html>
                    ";
                    builder.HtmlBody = htmlString;
                    email.Body = builder.ToMessageBody();
                    using var smtp = new SmtpClient();
                    smtp.Connect(_mailConfig.SmtpServer, _mailConfig.Port, SecureSocketOptions.StartTls);
                    smtp.Authenticate(_mailConfig.FromAdress, _mailConfig.Password);
                    smtp.Send(email);
                    smtp.Disconnect(true);
                    response.Status = StatusCode.Success;
                }
                else
                {
                    response.Status = StatusCode.Error;
                    response.StatusText = $"Failed when trying changes";
                }
            }
            return response;
        }
        public ResponseDTO DeleteUser(int id)
        {
            Users userToDelete = getUserForDelUpd(id);
            if (userToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.Users.Remove(userToDelete);
            int c = m_db.SaveChanges();
            ResponseDTO response = new ResponseDTO();
            if (c > 0)
                response.Status = StatusCode.Success;
            else
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Failed whem trying save changes";
            }
            return response;
        }
    }
}
