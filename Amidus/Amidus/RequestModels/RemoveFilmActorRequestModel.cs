using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.RequestModels
{
    public class RemoveFilmActorRequestModel
    {
        public int FilmId { get; set; }
        public int ActorId { get; set; }
    }
}
