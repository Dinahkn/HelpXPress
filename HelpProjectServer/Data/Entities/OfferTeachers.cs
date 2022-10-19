using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.Entities
{
    [Table("OfferTeachers")]
    public class OfferTeachers
    {
        [Key]
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

        //links with others tables
        public virtual HelpCategory HelpCategory { get; set; }
        public virtual Users Users { get; set; }
        public virtual City City { get; set; }   
        public virtual SubjectSchool SubjectSchool { get; set; }
        public virtual Levels Level { get; set; }
        
        



    }
}
