using Amidus.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Amidus.RequestModels
{
    public class GetFilmsResponseModel
    {
        public List<FilmsResponse> AllFilms { get; set; }
        public PagingInfoRequestModel PagingInfo { get; set; }

        public GetFilmsResponseModel(List<FilmsResponse> AllFilms, PagingInfoRequestModel PagingInfo)
        {
            this.AllFilms = AllFilms;
            this.PagingInfo = PagingInfo;
        }
    }
}
