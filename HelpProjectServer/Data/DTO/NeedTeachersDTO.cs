using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.DTO
{
    public class NeedTeachersDTO
    {
        public int IDNeedTeacher { get; set; }
        public int IDHelp { get; set; }
        public int IDUser { get; set; }
        public int IDCity { get; set; }
        public DateTime DatePossible { get; set; }
        public bool TimeSlice1 { get; set; }
        public bool TimeSlice2 { get; set; }
        public bool TimeSlice3 { get; set; }
        public bool TimeSlice4 { get; set; }
        public int IDSubject { get; set; }
        public int IDLevel { get; set; }
        public string Comments { get; set; }

        //information from user table
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Mail { get; set; }
        //information from cities table
        public string City { get; set; }
        //information from subject table
        public string Subject { get; set; }
        //information from level table
        public string Level { get; set; }









    }
}
