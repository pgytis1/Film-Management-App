using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.Models
{
    public class Actor
    {
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        //Other properties...

        public List<ActorFilm> ActorFilms { get; set; }
    }
}
