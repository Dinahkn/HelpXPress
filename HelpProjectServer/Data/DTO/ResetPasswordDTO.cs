using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.DTO
{
    public class ResetPasswordDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
