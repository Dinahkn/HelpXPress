using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.DTO
{
    public class NeedCarpoolsDTO
    {
        public int IDNeedCarpool { get; set; }
        public int IDHelp { get; set; }
        public int IDUser { get; set; }
        public int IDCityDeparture { get; set; }
        public int IDCityArrival { get; set; }
        public DateTime DateHourDeparture { get; set; }
        public double DepartureLatitude { get; set; }
        public double DepartureLongitude { get; set; }
        public double ArrivalLatitude { get; set; }
        public double ArrivalLongitude { get; set; }
        public string Comments { get; set; }

        //informations from user table
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Mail { get; set; }
        //informations from cities table
        public string CityDeparture { get; set; }
        public string CityArrival { get; set; }
    }
}
