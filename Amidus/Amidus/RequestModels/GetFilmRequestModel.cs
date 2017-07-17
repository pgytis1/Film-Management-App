using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Amidus.Models.SortTypeEnum;

namespace Amidus.RequestModels
{
    public class GetFilmRequestModel
    {
        public string Query { get; set; }
        public SortType SortBy { get; set; }
        public int Page { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string Genre { get; set; }
    }
}
