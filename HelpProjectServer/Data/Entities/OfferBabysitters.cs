using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.Entities
{
    [Table("OfferBabysitters")]
    public class OfferBabysitters
    {
        [Key]
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

        //links with other tables
        public virtual HelpCategory HelpCategory { get; set; }
        public virtual Users Users { get; set; }
        public virtual City City { get; set; }
             
        
    }
}
