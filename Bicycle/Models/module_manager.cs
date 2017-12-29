namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class module_manager
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public module_manager()
        {
            module_site = new HashSet<module_site>();
        }

        [Key]
        public int MagId { get; set; }

        [StringLength(10)]
        public string MagName { get; set; }

        public int? MagSex { get; set; }

        [StringLength(20)]
        public string MagAcc { get; set; }

        [StringLength(20)]
        public string MagPass { get; set; }

        [StringLength(20)]
        public string MagTel { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<module_site> module_site { get; set; }
    }
}
