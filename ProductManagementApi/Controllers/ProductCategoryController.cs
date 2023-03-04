using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProductAppDomain.Services;
using ProductAppDomain;


namespace ProductManagementApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductCategoryController : ControllerBase
    {
        private readonly ILogger<ProductCategoryController> _logger;
        private readonly IProductCategoryRepository _productCategoryRepository;
        private readonly IMapper _mapper;

        public ProductCategoryController(ILogger<ProductCategoryController> logger, IProductCategoryRepository productCategoryRepository, IMapper mapper)
        {
            _logger = logger;
            _productCategoryRepository = productCategoryRepository ??
               throw new ArgumentNullException(nameof(productCategoryRepository));

            _mapper = mapper ??
               throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> GetProductCategories()
        {
            var productcategory = await _productCategoryRepository.GetProducCategoriesAsync();

            return Ok(productcategory);

            // return Ok(_mapper.Map<IEnumerable<ProductDto>>(products));
        }
    }
}
