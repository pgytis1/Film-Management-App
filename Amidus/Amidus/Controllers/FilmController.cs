using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Amidus.IServices;
using Amidus.RequestModels;
using Amidus.Models;
using static Amidus.Models.SortTypeEnum;

namespace Amidus.Controllers
{
    [Route("api/[controller]")]
    public class FilmController : Controller
    {
        private readonly IFilmService _filmService;

        public FilmController(IFilmService filmService)
        {
            _filmService = filmService;
        }

        [HttpPost("PostMovie")]
        public IActionResult PostFilm([FromBody]CreateFilmRequestModel film)
        {
            if (film == null)
            {
                return BadRequest();
            }

            var response = _filmService.PostFilm(film);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetFilms([FromQuery] string query, int page, DateTime? dateFrom, DateTime? dateTo, SortType sortBy, string Genre)
        {
            var requestData = new GetFilmRequestModel() {
                Query = query,
                Page = page,
                DateFrom = dateFrom,
                DateTo = dateTo,
                Genre = Genre,
                SortBy = sortBy
            };
            var films = _filmService.GetFilms(requestData);
            return Ok(films);
        }

        [HttpPut("UpdateMovie")]
        public IActionResult UpdateFilm([FromBody]UpdateFilmRequestModel film)
        {
            var errors = _filmService.UpdateFilm(film);
            if (errors != null)
            {
                return NotFound(errors);
            }
            return Ok("Movie updated");
        }

        [HttpDelete("DeleteMovie")]
        public IActionResult DeleteFilm([FromQuery]int id)
        {
            var errors = _filmService.DeleteFilm(id);
            if (errors != null)
            {
                return NotFound(errors);
            }
            return Ok("Movie Deleted");
        }

        
        [HttpDelete("RemoveMovieActor")]
        public IActionResult RemoveFilmActor([FromQuery]int movieId, int actorId)
        {
            RemoveFilmActorRequestModel requestData = new RemoveFilmActorRequestModel()
            {
                FilmId = movieId,
                ActorId = actorId
            };
            var errors = _filmService.RemoveFilmActor(requestData);
            if (errors != null)
            {
                return NotFound(errors);
            }
            return Ok("Actor Removed From The Movie");
        }

        [HttpGet("GetGenres")]
        public IActionResult GetGenres()
        {
            return Ok(_filmService.GetGenres());
        }

        [HttpPost("AddFilmActors")]
        public IActionResult AddFilmActors([FromBody]AddFilmActorsRequestModel requestData)
        {
            if (requestData == null)
            {
                return BadRequest();
            }

            var response = _filmService.AddFilmActors(requestData);
            return Ok(response);
        }
        
    }
}
