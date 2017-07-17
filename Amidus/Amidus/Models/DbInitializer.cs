using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Amidus.Models
{
    public class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.Migrate();

            if (context.Actors.Any())
            {
                return;
            }

            var actors = AddActors();
            var films = AddFilms();
            var actorFilms = AddActorFilms(actors, films);

            context.AddRange(actors);
            context.SaveChanges();
            context.AddRange(films);
            context.AddRange(actorFilms);
            context.SaveChanges();
        }

        public static List<Actor> AddActors()
        {
            var actors = new List<Actor>
            {
                new Actor { FullName = "Antanas"},
                new Actor { FullName = "Petras"},
                new Actor { FullName = "Tadas"},
                new Actor { FullName = "Matas"},
                new Actor { FullName = "Gytis"},
                new Actor { FullName = "Julius"},
                new Actor { FullName = "Rokas"},
                new Actor { FullName = "Tomas"}
            };

            return actors;
        }

        public static List<ActorFilm> AddActorFilms(List<Actor> actors, List<Film> films)
        {
            var actorFilms = new List<ActorFilm>
            {
                new ActorFilm { Actor = actors[0], Film = films[0]},
                new ActorFilm { Actor = actors[1], Film = films[0]},
                new ActorFilm { Actor = actors[2], Film = films[0]},
                new ActorFilm { Actor = actors[3], Film = films[0]},

                new ActorFilm { Actor = actors[1], Film = films[1]},
                new ActorFilm { Actor = actors[2], Film = films[1]},
                new ActorFilm { Actor = actors[3], Film = films[1]},
                new ActorFilm { Actor = actors[4], Film = films[1]},

                new ActorFilm { Actor = actors[1], Film = films[2]},
                new ActorFilm { Actor = actors[2], Film = films[2]},
                new ActorFilm { Actor = actors[3], Film = films[2]},
                new ActorFilm { Actor = actors[4], Film = films[2]},

                new ActorFilm { Actor = actors[1], Film = films[3]},
                new ActorFilm { Actor = actors[2], Film = films[3]},
                new ActorFilm { Actor = actors[6], Film = films[4]},
                new ActorFilm { Actor = actors[5], Film = films[4]},

                new ActorFilm { Actor = actors[2], Film = films[5]},
                new ActorFilm { Actor = actors[3], Film = films[5]},
                new ActorFilm { Actor = actors[3], Film = films[6]},
                new ActorFilm { Actor = actors[7], Film = films[6]},
            };

            return actorFilms;
        }

        public static List<Film> AddFilms()
        {
            var films = new List<Film>
            {
                new Film { Title = "Home Alone", PublishDate = new DateTime(2016, 10, 05, 10, 30, 30), Genre= Constants.Genres[0]},
                new Film { Title = "Home Alone 2", PublishDate = new DateTime(2017, 10, 05, 10, 30, 30), Genre= Constants.Genres[1]},
                new Film { Title = "Home Alone 3", PublishDate = new DateTime(2011, 10, 05, 10, 30, 30), Genre= Constants.Genres[2]},
                new Film { Title = "Home Alone 4", PublishDate = new DateTime(2012, 10, 05, 10, 30, 30), Genre= Constants.Genres[3]},
                new Film { Title = "Home Alone 5", PublishDate = new DateTime(2011, 10, 05, 10, 30, 30), Genre= Constants.Genres[4]},
                new Film { Title = "Home Alone 6", PublishDate = new DateTime(2013, 10, 05, 10, 30, 30), Genre= Constants.Genres[1]},
                new Film { Title = "Star Wars", PublishDate = new DateTime(1996, 10, 05, 10, 30, 30), Genre= Constants.Genres[2]},
                new Film { Title = "Star Wars 1", PublishDate = new DateTime(1997, 11, 05, 10, 30, 30), Genre= Constants.Genres[3]},
                new Film { Title = "Star Wars 2", PublishDate = new DateTime(1998, 10, 05, 10, 30, 30), Genre= Constants.Genres[4]},
                new Film { Title = "Star Wars 3", PublishDate = new DateTime(1999, 10, 05, 10, 30, 30), Genre= Constants.Genres[0]},
                new Film { Title = "Star Wars 4", PublishDate = new DateTime(2000, 10, 05, 10, 30, 30), Genre= Constants.Genres[0]},
                new Film { Title = "Star Wars 5", PublishDate = new DateTime(2001, 10, 05, 10, 30, 30), Genre= Constants.Genres[0]},
                new Film { Title = "Star Wars 6", PublishDate = new DateTime(2002, 10, 05, 10, 30, 30), Genre= Constants.Genres[0]},

            };

            return films;
        }
    }
}
