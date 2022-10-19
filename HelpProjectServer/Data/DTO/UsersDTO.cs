using HelpProjectServer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.DTO
{
    public class UsersDTO
    {
        public int IDUser { get; set; }
        public string Mail { get; set; }
        public string Pswd { get; set; }
        public string TZ { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public int IDCity { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string RoleUser { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastConnectDate { get; set; }
        public string Comments { get; set; }

        //from relation with city
        public string CityName { get; set; }




                
    }
}
