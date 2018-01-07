namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class BicycleTable
    {
        [Key]
        public int BicId { get; set; }

        public int SiteId { get; set; }

        [StringLength(20)]
        public string BicType { get; set; }

        public double? BicRentPrice { get; set; }

        [StringLength(20)]
        public string SiteName { get; set; }

        [StringLength(10)]
        public string UserName { get; set; }

        public int? BicBorrowed { get; set; }

        public int? BicBorrowedCount { get; set; }

        public DateTime? BicBuytime { get; set; }
    }
}