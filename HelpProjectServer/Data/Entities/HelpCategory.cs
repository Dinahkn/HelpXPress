using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.Entities
{
    [Table("HelpCategory")]
    public class HelpCategory
    {
        [Key]
        public int IDHelp { get; set; }
        public string NameHelp { get; set; }

        public virtual OfferTeachers OfferTeachers { get; set; }
        public virtual NeedTeachers NeedTeachers { get; set; }
        public virtual OfferBabysitters Babysitters { get; set; }
        public virtual NeedBabysitters NeedBabysitters { get; set; }
        public virtual OfferCarpools OfferCarpools { get; set; }
        public virtual NeedCarpools NeedCarpools { get; set; }
    }
}
