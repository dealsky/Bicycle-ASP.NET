namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class module_user
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public module_user()
        {
            //module_login = new HashSet<module_login>();
            module_rentalcard = new HashSet<module_rentalcard>();
            module_rented = new HashSet<module_rented>();
        }

        [Key]
        public int UserId { get; set; }

        [StringLength(10)]
        public string UserName { get; set; }

        public int? UserSex { get; set; }

        [StringLength(20)]
        public string UserAcc { get; set; }

        [StringLength(20)]
        public string UserPass { get; set; }

        [StringLength(20)]
        public string UserTel { get; set; }

        [StringLength(20)]
        public string UserIdCard { get; set; }

        [StringLength(35)]
        public string UserEmail { get; set; }

        public DateTime? UserRegTime { get; set; }

        public DateTime? UserLastLoginTime { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<module_login> module_login { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<module_rentalcard> module_rentalcard { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<module_rented> module_rented { get; set; }
    }
}
