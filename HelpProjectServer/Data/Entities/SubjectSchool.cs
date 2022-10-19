using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.Entities
{
    [Table("SubjectSchool")]
    public class SubjectSchool
    {
        [Key]
        public int IDSubject { get; set; }
        public string NameSubject { get; set; }

        public virtual OfferTeachers OfferTeachers { get; set; }
        public virtual NeedTeachers NeedTeachers { get; set; }
    }
}
