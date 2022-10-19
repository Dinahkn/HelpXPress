using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data.Entities
{
    [Table("Users")]
    public class Users
    {
        [Key]
        public int IDUser { get; set; }
        public string Mail { get; set; }
        public string Pswd { get; set; }
        public string TZ { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public int IDCity { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string RoleUser { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastConnectDate { get; set; }
        public string Comments { get; set; }

        public virtual City City { get; set; }
        public virtual ICollection<OfferTeachers> OfferTeachers { get; set; }
        public virtual ICollection<NeedTeachers> NeedTeachers { get; set; }
        public virtual ICollection<OfferBabysitters> Babysitters { get; set; }
        public virtual ICollection<NeedBabysitters> NeedBabysitters { get; set; }
        public virtual ICollection<OfferCarpools> OfferCarpools { get; set; }
        public virtual ICollection<NeedCarpools> NeedCarpools { get; set; }

    }
}
