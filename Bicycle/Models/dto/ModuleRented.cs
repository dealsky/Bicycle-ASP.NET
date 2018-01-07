namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ModuleRented
    {
        [Key]
        public int RentId { get; set; }

        public int BicId { get; set; }

        public int UserId { get; set; }

        [StringLength(10)]
        public string UserName { get; set; }

        [StringLength(20)]
        public string BicType { get; set; }

        public double? BicRentPrice { get; set; }

        public double? RentPrice { get; set; }

        public int? RentStatus { get; set; }

        public DateTime? RentBowTime { get; set; }

        public DateTime? RentRenTime { get; set; }
    }
}
