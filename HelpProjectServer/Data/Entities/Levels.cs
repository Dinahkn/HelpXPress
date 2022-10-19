using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.Entities
{
    [Table("Levels")]
    public class Levels
    {
        [Key]
        public int IDLevel { get; set; }
        public string NameLevel { get; set; }

        public virtual OfferTeachers OfferTeachers { get; set; }
        public virtual NeedTeachers NeedTeachers { get; set; }
    }
}
