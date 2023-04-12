using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.Models.Facility;
using Server.Models;

namespace Server.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

          /*  CreateMap<Asset, AssetViewModel>()
            .ForMember(dest => dest.AssetId, act => act.MapFrom(src => src.Id))
            .ForMember(dest => dest.Description, act => act.MapFrom(src => src.Description))
            .ForMember(dest => dest.Vendor, act => act.MapFrom(src => src.Vendor))
            .ForMember(dest => dest.FacilityAssetId, act => act.MapFrom(src => src.FacilityAsset.Id))
            .ForMember(dest => dest.SubCategoryId, act => act.MapFrom(src => src.Stock.SubCategoryId))
            .ForMember(dest => dest.CategoryId, act => act.MapFrom(src => src.Stock.SubCategory.CategoryId));*/

        }
    }
}