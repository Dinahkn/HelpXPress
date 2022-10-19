using HelpProjectServer.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Data
{
    public class HelpDBContext : DbContext
    {
        public HelpDBContext(DbContextOptions<HelpDBContext> options) : base(options){}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>(entity =>
            {
                entity
                .HasOne<City>(c => c.City)
                .WithOne(g => g.Users)
                .HasForeignKey<Users>(s => s.IDCity);
            });
            //offer bbsit   
            modelBuilder.Entity<Users>(entity =>
            {
                entity
                .HasMany<OfferBabysitters>(s => s.Babysitters)
                .WithOne(g => g.Users)
                .HasForeignKey(s => s.IDUser)
                .OnDelete(DeleteBehavior.ClientCascade);

            });
            modelBuilder.Entity<HelpCategory>(entity =>
            {
                entity
                .HasOne<OfferBabysitters>(s => s.Babysitters)
                .WithOne(c => c.HelpCategory)
                .HasForeignKey<OfferBabysitters>(s => s.IDHelp);
            });
            modelBuilder.Entity<OfferBabysitters>(entity =>
            {
                entity
                .HasOne<City>(c => c.City)
                .WithOne(g => g.Babysitters)
                .HasForeignKey<OfferBabysitters>(s => s.IDCity);
            });
            //need bbsti
            modelBuilder.Entity<Users>(entity =>
            {
                entity
                .HasMany<NeedBabysitters>(s => s.NeedBabysitters)
                .WithOne(g => g.Users)
                .HasForeignKey(s => s.IDUser)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            modelBuilder.Entity<HelpCategory>(entity =>
            {
                entity
                .HasOne<NeedBabysitters>(s => s.NeedBabysitters)
                .WithOne(c => c.HelpCategory)
                .HasForeignKey<NeedBabysitters>(s => s.IDHelp);
            });
            modelBuilder.Entity<NeedBabysitters>(entity =>
            {
                entity
                .HasOne<City>(c => c.City)
                .WithOne(g => g.NeedBabysitters)
                .HasForeignKey<NeedBabysitters>(s => s.IDCity);
            });
            //offer teachers
            modelBuilder.Entity<Users>(entity =>
            {
                entity
                .HasMany<OfferTeachers>(s => s.OfferTeachers)
                .WithOne(g => g.Users)
                .HasForeignKey(s => s.IDUser)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            modelBuilder.Entity<HelpCategory>(entity =>
            {
                entity
                .HasOne<OfferTeachers>(s => s.OfferTeachers)
                .WithOne(c => c.HelpCategory)
                .HasForeignKey<OfferTeachers>(s => s.IDHelp);
            });
            modelBuilder.Entity<OfferTeachers>(entity =>
            {
                entity
                .HasOne<City>(c => c.City)
                .WithOne(g => g.OfferTeachers)
                .HasForeignKey<OfferTeachers>(s => s.IDCity);
            });
            modelBuilder.Entity<Levels>(entity =>
            {
                entity
                .HasOne<OfferTeachers>(c => c.OfferTeachers)
                .WithOne(g => g.Level)
                .HasForeignKey<OfferTeachers>(s => s.IDLevel)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            modelBuilder.Entity<SubjectSchool>(entity =>
            {
                entity
                .HasOne<OfferTeachers>(c => c.OfferTeachers)
                .WithOne(g => g.SubjectSchool)
                .HasForeignKey<OfferTeachers>(s => s.IDSubject)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            //need teachers
            modelBuilder.Entity<Users>(entity =>
            {
                entity
                .HasMany<NeedTeachers>(s => s.NeedTeachers)
                .WithOne(g => g.Users)
                .HasForeignKey(s => s.IDUser)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            modelBuilder.Entity<HelpCategory>(entity =>
            {
                entity
                .HasOne<NeedTeachers>(s => s.NeedTeachers)
                .WithOne(c => c.HelpCategory)
                .HasForeignKey<NeedTeachers>(s => s.IDHelp);
            });
            modelBuilder.Entity<NeedTeachers>(entity =>
            {
                entity
                .HasOne<City>(c => c.City)
                .WithOne(g => g.NeedTeachers)
                .HasForeignKey<NeedTeachers>(s => s.IDCity);
            });
            modelBuilder.Entity<Levels>(entity =>
            {
                entity
                .HasOne<NeedTeachers>(c => c.NeedTeachers)
                .WithOne(g => g.Level)
                .HasForeignKey<NeedTeachers>(s => s.IDLevel)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            modelBuilder.Entity<SubjectSchool>(entity =>
            {
                entity
                .HasOne<NeedTeachers>(c => c.NeedTeachers)
                .WithOne(g => g.SubjectSchool)
                .HasForeignKey<NeedTeachers>(s => s.IDSubject)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            //offer carpools
            modelBuilder.Entity<Users>(entity =>
            {
                entity
                .HasMany<OfferCarpools>(s => s.OfferCarpools)
                .WithOne(g => g.Users)
                .HasForeignKey(s => s.IDUser)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            modelBuilder.Entity<HelpCategory>(entity =>
            {
                entity
                .HasOne<OfferCarpools>(s => s.OfferCarpools)
                .WithOne(c => c.HelpCategory)
                .HasForeignKey<OfferCarpools>(s => s.IDHelp);
            });
            modelBuilder.Entity<OfferCarpools>()
                .HasOne(d => d.CityDeparture)
                .WithMany(o => o.OfferCarpoolsDeparture)
                .HasForeignKey(c => c.IDCityDeparture)
                .OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<OfferCarpools>()
                .HasOne(d => d.CityArrival)
                .WithMany(o => o.OfferCarpoolsArrival)
                .HasForeignKey(c => c.IDCityArrival)
                .OnDelete(DeleteBehavior.ClientCascade);

            //need carpools

            modelBuilder.Entity<NeedCarpools>()
                .HasOne(d => d.CityDeparture)
                .WithMany(n => n.NeedCarpoolsDeparture)
                .HasForeignKey(c => c.IDCityDeparture)
                .OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<NeedCarpools>()
                .HasOne(d => d.CityArrival)
                .WithMany(n => n.NeedCarpoolsArrival)
                .HasForeignKey(c => c.IDCityArrival)
                .OnDelete(DeleteBehavior.ClientCascade);

            modelBuilder.Entity<Users>(entity =>
            {
                entity
                .HasMany<NeedCarpools>(s => s.NeedCarpools)
                .WithOne(g => g.Users)
                .HasForeignKey(s => s.IDUser)
                .OnDelete(DeleteBehavior.ClientCascade);
            });
            modelBuilder.Entity<HelpCategory>(entity =>
            {
                entity
                .HasOne<NeedCarpools>(s => s.NeedCarpools)
                .WithOne(c => c.HelpCategory)
                .HasForeignKey<NeedCarpools>(s => s.IDHelp);
            });

        }
        //הצהרה טבלאות
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<HelpCategory> HelpCategory { get; set; }
        public virtual DbSet<OfferTeachers> OfferTeachers { get; set; }
        public virtual DbSet<NeedTeachers> NeedTeachers { get; set; }
        public virtual DbSet<SubjectSchool> SubjectSchool { get; set; }
        public virtual DbSet<Levels> Levels { get; set; }
        public virtual DbSet<OfferBabysitters> Babysitters { get; set; }
        public virtual DbSet<NeedBabysitters> NeedBabysitters { get; set; }
        public virtual DbSet<OfferCarpools> OfferCarpools { get; set; }
        public virtual DbSet<NeedCarpools> NeedCarpools { get; set; }
    }
}
