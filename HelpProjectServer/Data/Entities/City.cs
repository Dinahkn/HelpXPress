using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.Entities
{
    [Table("City")]
    public class City
    {
        [Key]
        public int IDCity { get; set; }
        public string CityName { get; set; }
        public string CityCountry { get; set; }

        public virtual Users Users { get; set; }
        public virtual OfferTeachers OfferTeachers { get; set; }
        public virtual NeedTeachers NeedTeachers { get; set; }
        public virtual OfferBabysitters Babysitters { get; set; }
        public virtual NeedBabysitters NeedBabysitters { get; set; }
        public virtual ICollection<OfferCarpools> OfferCarpoolsDeparture { get; set; }
        public virtual ICollection<OfferCarpools> OfferCarpoolsArrival { get; set; }
        public virtual ICollection<NeedCarpools> NeedCarpoolsDeparture { get; set; }
        public virtual ICollection<NeedCarpools> NeedCarpoolsArrival { get; set; }

    }
}
