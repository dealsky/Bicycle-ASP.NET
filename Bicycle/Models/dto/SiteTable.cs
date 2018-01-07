namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SiteTable
    {
        [Key]
        public int SiteId { get; set; }

        public int? MagId { get; set; }

        [StringLength(10)]
        public string MagName { get; set; }

        [StringLength(20)]
        public string SiteName { get; set; }

        [StringLength(20)]
        public string SiteArea { get; set; }

        public int? SiteAmount { get; set; }
    }
}
