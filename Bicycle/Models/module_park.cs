namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class module_park
    {
        [Key]
        public int ParkId { get; set; }

        public int SiteId { get; set; }

        public int BicId { get; set; }

        [StringLength(20)]
        public string BicType { get; set; }

        public double? BicRentPrice { get; set; }

        public int? BicBorrowedCount { get; set; }

        [StringLength(20)]
        public string SiteName { get; set; }

        public DateTime? ParkTime { get; set; }

        public virtual module_bicycle module_bicycle { get; set; }

        public virtual module_site module_site { get; set; }
    }
}
