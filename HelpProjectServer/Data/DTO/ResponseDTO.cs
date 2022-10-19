using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.DTO
{
    public enum StatusCode
    {
        Success=1000,
        Error,
        Warning
    }
    public class ResponseDTO
    {
        public StatusCode Status { get; set; }
        public string StatusText { get; set; }
    }
}
