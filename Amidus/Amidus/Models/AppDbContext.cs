using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.Models
{
    public class AppDbContext: DbContext
    {
        
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Film> Films { get; set; }
        public DbSet<ActorFilm> ActorFilms { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ActorFilm>()
            .HasKey(af => new { af.FilmId, af.ActorId });

            modelBuilder.Entity<ActorFilm>()
                .HasOne(af => af.Actor)
                .WithMany(a => a.ActorFilms)
                .HasForeignKey(af => af.ActorId);

            modelBuilder.Entity<ActorFilm>()
                .HasOne(af => af.Film)
                .WithMany(f => f.ActorFilms)
                .HasForeignKey(af => af.FilmId);
        }
    }
}
