using HelpProjectServer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.DTO
{
    public class OfferTeachersDTO
    {
        public int IDTeacher { get; set; }
        public int IDHelp { get; set; }
        public int IDUser { get; set; }
        public int IDCity { get; set; }
        public DateTime DatePossible { get; set; }
        public int YearsExperience { get; set; }
        public int Price { get; set; }
        public bool TimeSlice1 { get; set; }
        public bool TimeSlice2 { get; set; }
        public bool TimeSlice3 { get; set; }
        public bool TimeSlice4 { get; set; }
        public int IDSubject { get; set; }
        public int IDLevel { get; set; }
        public string Comments { get; set; }

        //from links with user table
        public string Mail { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        //link with city table
        public string City { get; set; }
        //link with subject table
        public string Subject { get; set; }
        //link with level table
        public string Level { get; set; }



    }
}
