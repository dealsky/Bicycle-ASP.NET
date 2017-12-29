namespace Bicycle.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DBModel : DbContext
    {
        public DBModel()
            : base("name=DBModel")
        {
        }

        public virtual DbSet<module_bicycle> module_bicycle { get; set; }
        public virtual DbSet<module_login> module_login { get; set; }
        public virtual DbSet<module_manager> module_manager { get; set; }
        public virtual DbSet<module_park> module_park { get; set; }
        public virtual DbSet<module_rentalcard> module_rentalcard { get; set; }
        public virtual DbSet<module_rented> module_rented { get; set; }
        public virtual DbSet<module_site> module_site { get; set; }
        public virtual DbSet<module_user> module_user { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<module_bicycle>()
                .Property(e => e.BicType)
                .IsUnicode(false);

            modelBuilder.Entity<module_bicycle>()
                .HasMany(e => e.module_park)
                .WithRequired(e => e.module_bicycle)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<module_bicycle>()
                .HasMany(e => e.module_rented)
                .WithRequired(e => e.module_bicycle)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<module_login>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<module_login>()
                .Property(e => e.LoginIP)
                .IsUnicode(false);

            modelBuilder.Entity<module_login>()
                .Property(e => e.LoginAddr)
                .IsUnicode(false);

            modelBuilder.Entity<module_manager>()
                .Property(e => e.MagName)
                .IsUnicode(false);

            modelBuilder.Entity<module_manager>()
                .Property(e => e.MagAcc)
                .IsUnicode(false);

            modelBuilder.Entity<module_manager>()
                .Property(e => e.MagPass)
                .IsUnicode(false);

            modelBuilder.Entity<module_manager>()
                .Property(e => e.MagTel)
                .IsUnicode(false);

            modelBuilder.Entity<module_park>()
                .Property(e => e.BicType)
                .IsUnicode(false);

            modelBuilder.Entity<module_park>()
                .Property(e => e.SiteName)
                .IsUnicode(false);

            modelBuilder.Entity<module_rented>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<module_rented>()
                .Property(e => e.BicType)
                .IsUnicode(false);

            modelBuilder.Entity<module_site>()
                .Property(e => e.SiteName)
                .IsUnicode(false);

            modelBuilder.Entity<module_site>()
                .Property(e => e.SiteArea)
                .IsUnicode(false);

            modelBuilder.Entity<module_site>()
                .HasMany(e => e.module_park)
                .WithRequired(e => e.module_site)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<module_user>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<module_user>()
                .Property(e => e.UserAcc)
                .IsUnicode(false);

            modelBuilder.Entity<module_user>()
                .Property(e => e.UserPass)
                .IsUnicode(false);

            modelBuilder.Entity<module_user>()
                .Property(e => e.UserTel)
                .IsUnicode(false);

            modelBuilder.Entity<module_user>()
                .Property(e => e.UserIdCard)
                .IsUnicode(false);

            modelBuilder.Entity<module_user>()
                .Property(e => e.UserEmail)
                .IsUnicode(false);

            modelBuilder.Entity<module_user>()
                .HasMany(e => e.module_rented)
                .WithRequired(e => e.module_user)
                .WillCascadeOnDelete(false);
        }
    }
}
