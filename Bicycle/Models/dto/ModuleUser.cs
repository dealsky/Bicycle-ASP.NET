namespace Bicycle.Models.dto
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ModuleUser
    {

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

    }
}