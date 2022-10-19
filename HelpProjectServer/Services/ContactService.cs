using HelpProjectServer.Data.DTO;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Services
{
    public class ContactService
    {
        private readonly EmailConfigurationDTO _mailConfig;
        public ContactService(IOptions<EmailConfigurationDTO> mailconf)
        {
            _mailConfig = mailconf.Value;
        }
        public ResponseDTO SendContactUs(ContactFormDTO contact)
        {
            ResponseDTO response = new ResponseDTO();
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_mailConfig.UserName, _mailConfig.FromAdress));
                email.To.Add(new MailboxAddress(_mailConfig.UserName, _mailConfig.FromAdress));
                email.Cc.Add(new MailboxAddress(contact.Name, contact.Email));
                email.Subject = contact.Subject;
                var builder = new BodyBuilder();
                builder.HtmlBody = contact.Body;
                email.Body = builder.ToMessageBody();
                using var smtp = new SmtpClient();
                smtp.Connect(_mailConfig.SmtpServer, _mailConfig.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(_mailConfig.FromAdress, _mailConfig.Password);
                smtp.Send(email);
                smtp.Disconnect(true);
                response.Status = StatusCode.Success;
            }
            catch (Exception ex)
            {
                response.Status = StatusCode.Error;
            }
            return response;

        }
    }
}
