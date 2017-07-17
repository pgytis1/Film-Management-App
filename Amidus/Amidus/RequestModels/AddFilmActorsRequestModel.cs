using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.RequestModels
{
    public class AddFilmActorsRequestModel
    {
        public int FilmId { get; set; }
        public List<int> ActorsIds { get; set; }
    }
}
