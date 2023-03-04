namespace ProductManagementClient.Profiles
{
    using AutoMapper;
     public class AutoMapperProfiles : Profile
     {
        public AutoMapperProfiles() {

            CreateMap<ProductAppDomain.Product, ProductAppDomain.Models.DTO.ProductRequestAdd>();
            CreateMap<ProductAppDomain.Models.DTO.ProductRequestAdd, ProductAppDomain.Product>();
            CreateMap< ProductAppDomain.Models.DTO.Product, ProductAppDomain.Product>();
        }
     }
}
