namespace Bicycle.Models.dto
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ModuleManager
    {

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

    }
}