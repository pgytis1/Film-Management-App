using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Amidus.Models;

namespace Amidus.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Amidus.Models.Actor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FullName")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Actors");
                });

            modelBuilder.Entity("Amidus.Models.ActorFilm", b =>
                {
                    b.Property<int>("FilmId");

                    b.Property<int>("ActorId");

                    b.HasKey("FilmId", "ActorId");

                    b.HasIndex("ActorId");

                    b.ToTable("ActorFilms");
                });

            modelBuilder.Entity("Amidus.Models.Film", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Genre")
                        .IsRequired();

                    b.Property<DateTime>("PublishDate");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Films");
                });

            modelBuilder.Entity("Amidus.Models.ActorFilm", b =>
                {
                    b.HasOne("Amidus.Models.Actor", "Actor")
                        .WithMany("ActorFilms")
                        .HasForeignKey("ActorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Amidus.Models.Film", "Film")
                        .WithMany("ActorFilms")
                        .HasForeignKey("FilmId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
