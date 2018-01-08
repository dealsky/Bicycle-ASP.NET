namespace Bicycle.Models.dto
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ModuleBicycle
    {

        [Key]
        public int BicId { get; set; }

        [StringLength(20)]
        public string BicType { get; set; }

        public double? BicRentPrice { get; set; }

        public DateTime? BicBuytime { get; set; }

        public int? BicBorrowed { get; set; }

        public int? BicBorrowedCount { get; set; }
        
    }
}