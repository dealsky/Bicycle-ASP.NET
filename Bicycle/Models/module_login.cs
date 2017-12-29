namespace Bicycle.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class module_login
    {
        [Key]
        public int LoginId { get; set; }

        public int? UserId { get; set; }

        [StringLength(10)]
        public string UserName { get; set; }

        [StringLength(50)]
        public string LoginIP { get; set; }

        [StringLength(50)]
        public string LoginAddr { get; set; }

        public DateTime? LoginTime { get; set; }

        //public virtual module_user module_user { get; set; }
    }
}
