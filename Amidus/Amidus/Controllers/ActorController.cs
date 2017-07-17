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
    public class ActorController:Controller
    {
        private readonly IActorService _actorService;

        public ActorController(IActorService actorService)
        {
            _actorService = actorService;
        }

        [HttpPut("UpdateActor")]
        public IActionResult UpdateActor([FromBody]Actor actor)
        {
            var errors = _actorService.UpdateActor(actor);
            if (errors != null)
            {
                return NotFound(errors);
            }
            return Ok("Actor updated");
        }

        [HttpPost("PostActor")]
        public IActionResult PostActor([FromQuery]string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("You need to specify actor's name");
            }

            var response = _actorService.PostActor(name);
            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetActors([FromQuery] string query)
        {

            var actors = _actorService.GetActors(query);
            return Ok(actors);
        }

        [HttpDelete]
        public IActionResult DeleteActor([FromQuery]int id)
        {

            var response = _actorService.DeleteActor(id);
            if (response != null)
            {
                return NotFound(response);
            }
            return Ok("Success");
        }
    }
}
