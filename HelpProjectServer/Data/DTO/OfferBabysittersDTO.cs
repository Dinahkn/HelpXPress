
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.DTO
{
    public class OfferBabysittersDTO
    {
        public int IDBabysitter { get; set; }
        public int IDHelp { get; set; }
        public int IDUser { get; set; }
        public int IDCity { get; set; }
        public int Price { get; set; }
        public DateTime DateBabysitter { get; set; }
        public int YearsExperience { get; set; }
        public bool TimeSlice1 { get; set; }
        public bool TimeSlice2 { get; set; }
        public bool TimeSlice3 { get; set; }
        public bool TimeSlice4 { get; set; }
        public string Comments { get; set; }

        //information from user table
        public string FullName { get; set; }
        public string Mail { get; set; }
        public string Phone { get; set; }
        //information from cities table
        public string City { get; set; }


    }
}
