using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.Models
{
    public class PagingInfoRequestModel
    {
        [Required]
        public int TotalPages { get; set; }
        [Required]
        public int VisiblePages { get; set; }
        [Required]
        public int MarginPagesDisplayed { get; set; }
    }
}
