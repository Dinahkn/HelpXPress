﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.Entities
{
    [Table("NeedCarpools")]
    public class NeedCarpools
    {
        [Key]
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

        //link with other tables
        public virtual HelpCategory HelpCategory { get; set; }
        public virtual Users Users { get; set; }
        public virtual City CityDeparture { get; set; }
        public virtual City CityArrival { get; set; }


    }
}
