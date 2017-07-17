using Amidus.Models;
using Amidus.RequestModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.IServices
{
    public interface IFilmService
    {
        string[] PostFilm(CreateFilmRequestModel film);
        GetFilmsResponseModel GetFilms(GetFilmRequestModel requestData);
        string[] UpdateFilm(UpdateFilmRequestModel film);
        List<String> GetGenres();
        string[] DeleteFilm(int id);
        string[] RemoveFilmActor(RemoveFilmActorRequestModel requestData);
        string[] AddFilmActors(AddFilmActorsRequestModel requestData);
    }
}
