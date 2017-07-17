using Amidus.IServices;
using Amidus.Models;
using Amidus.RequestModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static Amidus.Models.SortTypeEnum;

namespace Amidus.Services
{
    public class FilmService : IFilmService
    {
        private readonly AppDbContext dbContext;

        public FilmService(AppDbContext context)
        {
            this.dbContext = context;
        }

        public string[] DeleteFilm(int id)
        {
            var itemToRemove = dbContext.Films.SingleOrDefault(x => x.Id == id);

            if (itemToRemove == null)
            {
                return new[] { "Film doesn't exist" };
            }

            dbContext.Films.Remove(itemToRemove);
            dbContext.SaveChanges();

            return null;
        }

        private PagingInfoRequestModel GetPagingInfo(int FilmsCount)
        {
            var totalPages = FilmsCount / Constants.PageSize;
            if (FilmsCount % Constants.PageSize != 0) totalPages++;

            var pagingInfo = new PagingInfoRequestModel
            {
                TotalPages = totalPages,
                VisiblePages = Constants.VisiblePages,
                MarginPagesDisplayed = Constants.MarginPagesDisplayed
            };

            return pagingInfo;
        }

        public GetFilmsResponseModel GetFilms(GetFilmRequestModel requestData)
        {
            if (requestData.Page < 1)
            {
                requestData.Page = 1;
            }

            var films = dbContext.Films.Select(x => x);

            if (!string.IsNullOrEmpty(requestData.Query))
            {
                films = films
                        .Where(x => (x.Title).ToLower().Contains(requestData.Query.ToLower()));
            }

            if (requestData.DateFrom != null)
            {
                films = films
                        .Where(x => x.PublishDate > requestData.DateFrom);
            }

            if (requestData.DateTo != null)
            {
                films = films
                        .Where(x => x.PublishDate < requestData.DateTo);
            }

            if (!string.IsNullOrEmpty(requestData.Genre) && requestData.Genre != "None")
            {
                films = films
                        .Where(x => x.Genre == requestData.Genre);
            }

            
            switch (requestData.SortBy)
            {
                case SortType.Title_Asc:
                    films = films.OrderBy(x => x.Title);
                    break;

                case SortType.Title_Desc:
                    films = films.OrderByDescending(x => x.Title);
                    break;

                case SortType.Date_Asc:
                    films = films.OrderBy(x => x.PublishDate);
                    break;

                case SortType.Date_Desc:
                    films = films.OrderByDescending(x => x.PublishDate);
                    break;
                default:
                    films = films.OrderBy(x => x.Id);
                    break;
            }

            var filmsCount = films.Count();

            var allFilms = films
                            .Skip((requestData.Page - 1) * Constants.PageSize)
                            .Take(Constants.PageSize)
                            .Select(x => new FilmsResponse
                            {
                                Id = x.Id,
                                Genre = x.Genre,
                                Actors = x.ActorFilms.Select(y => y.Actor).ToList(),
                                PublishDate = x.PublishDate,
                                Title = x.Title
                            })
                            .ToList();

            var FilmsResponse = new GetFilmsResponseModel(allFilms, GetPagingInfo(filmsCount));

            return FilmsResponse;
        }

        public string[] PostFilm(CreateFilmRequestModel film)
        {
            var isValidGenre = Constants.Genres.Contains(film.Genre);

            if (!isValidGenre)
            {
                return new[] { "Genre is not valid" };
            }

            var filmToDb = new Film
            {
                Title = film.Title,
                PublishDate = film.PublishDate,
                Genre = film.Genre
            };

           dbContext.Films.Add(filmToDb);
           dbContext.SaveChanges();

            var actorFilms = new List<ActorFilm>();
            if (film.ActorsIds != null && film.ActorsIds.Count != 0)
            {
                foreach (var id in film.ActorsIds)
                {

                    var isActorExist = dbContext.Actors.Any(x => x.Id == id);
                    var isActorFilmAlreadyAddedToDb = dbContext.ActorFilms.Any(x => x.ActorId == id && x.FilmId == filmToDb.Id);
                    if (isActorExist && !isActorFilmAlreadyAddedToDb)
                    {
                        actorFilms.Add(new ActorFilm()
                        {
                            FilmId = filmToDb.Id,
                            ActorId = id
                        });
                    }
                }
            }


            dbContext.ActorFilms.AddRange(actorFilms);
            dbContext.SaveChanges();

            return new[] { "Success" };
        }


        public List<string> GetGenres()
        {
            return Constants.Genres;
        }


        public string[] UpdateFilm(UpdateFilmRequestModel film)
        {
            var filmToUpdate = dbContext.Films
                             .SingleOrDefault(x => x.Id == film.Id);

            var isValidGenre = Constants.Genres.Contains(film.Genre);

            if (!isValidGenre)
            {
                return new[] { "Genre is not valid" };
            }

            if (string.IsNullOrEmpty(film.Title))
            {
                return new[] { "Movie must have name" };
            }

            if (filmToUpdate != null)
            {
                //Update Movie
                var filmEntry = dbContext.Entry(filmToUpdate);
                filmEntry.CurrentValues.SetValues(film);

                dbContext.SaveChanges();
                return null;
            }
            else return new[] { "This movie doesn't exist." };
        }

        public string[] RemoveFilmActor(RemoveFilmActorRequestModel requestData)
        {
            var actorFilmToRemove = dbContext
                                .ActorFilms
                                .SingleOrDefault(x => x.FilmId == requestData.FilmId && x.ActorId == requestData.ActorId);

            if (actorFilmToRemove == null)
            {
                return new[] { "Movie doesn't exist" };
            }


            dbContext.ActorFilms.Remove(actorFilmToRemove);                 
            dbContext.SaveChanges();

            return null;
        }

        public string[] AddFilmActors(AddFilmActorsRequestModel requestData)
        {

            var isFilmExist = dbContext.Films.Any(x => x.Id == requestData.FilmId);

            if (!isFilmExist)
            {
                return new[] { "Movie doesn't exist" };
            }

            var actorFilms = new List<ActorFilm>();
            if (requestData.ActorsIds != null && requestData.ActorsIds.Count != 0)
            {
                foreach (var id in requestData.ActorsIds)
                {
                    var isActorExist = dbContext.Actors.Any(x => x.Id == id);
                    var isActorFilmAlreadyAddedToDb = dbContext.ActorFilms.Any(x => x.ActorId == id && x.FilmId == requestData.FilmId);
                    if (isActorExist && !isActorFilmAlreadyAddedToDb)
                    {
                        actorFilms.Add(new ActorFilm()
                        {
                            FilmId = requestData.FilmId,
                            ActorId = id
                        });
                    }
                }
            }


            dbContext.ActorFilms.AddRange(actorFilms);
            dbContext.SaveChanges();

            return new[] { "Success" };
        }

    }
    }
