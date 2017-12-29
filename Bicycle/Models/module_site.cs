namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class module_site
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public module_site()
        {
            module_park = new HashSet<module_park>();
        }

        [Key]
        public int SiteId { get; set; }

        public int? MagId { get; set; }

        [StringLength(20)]
        public string SiteName { get; set; }

        [StringLength(20)]
        public string SiteArea { get; set; }

        public int? SiteAmount { get; set; }

        //public virtual module_manager module_manager { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<module_park> module_park { get; set; }
    }
}
