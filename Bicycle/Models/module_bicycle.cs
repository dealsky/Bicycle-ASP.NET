namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class module_bicycle
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public module_bicycle()
        {
            module_park = new HashSet<module_park>();
            module_rented = new HashSet<module_rented>();
        }

        [Key]
        public int BicId { get; set; }

        [StringLength(20)]
        public string BicType { get; set; }

        public double? BicRentPrice { get; set; }

        public DateTime? BicBuytime { get; set; }

        public int? BicBorrowed { get; set; }

        public int? BicBorrowedCount { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<module_park> module_park { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<module_rented> module_rented { get; set; }
    }
}
