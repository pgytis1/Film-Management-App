using Amidus.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.RequestModels
{
    public class CreateFilmRequestModel
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public DateTime PublishDate { get; set; }
        [Required]
        public string Genre { get; set; }
        public List<int> ActorsIds { get; set; }
    }
}
