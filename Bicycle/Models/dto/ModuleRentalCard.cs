namespace Bicycle.Models.dto
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ModuleRentalCard
    {
        [Key]
        public int RecId { get; set; }

        public int? UserId { get; set; }

        public double? RecBalance { get; set; }

        public int? RecStatus { get; set; }

        public DateTime? RecOptime { get; set; }

    }
}