using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.DTO
{
    public class NeedBabysittersDTO
    {
        public int IDNeedBabysitter { get; set; }
        public int IDHelp { get; set; }
        public int IDUser { get; set; }
        public int IDCity { get; set; }
        public DateTime DateBabysitter { get; set; }
        public bool TimeSlice1 { get; set; }
        public bool TimeSlice2 { get; set; }
        public bool TimeSlice3 { get; set; }
        public bool TimeSlice4 { get; set; }
        public string Comments { get; set; }
        
        //informations from user table
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Mail { get; set; }
        //information from cities table
        public string City { get; set; }
    }
}
