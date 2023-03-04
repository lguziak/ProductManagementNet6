using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProductAppDomain.Services;
using ProductAppDomain.Models.DTO;

namespace ProductManagementApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
       
        private readonly ILogger<ProductsController> _logger;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductsController(ILogger<ProductsController> logger, IProductRepository productRepository,IMapper mapper)
        {
            _logger = logger;
            _productRepository = productRepository ??
               throw new ArgumentNullException(nameof(productRepository));

            _mapper = mapper ??
               throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductAppDomain.Models.DTO.Product>>> GetProducts()
        {
            var products = await _productRepository.GetProductsAsync();
            products = products.OrderByDescending(m =>  m.ModifiedDate).Take(60) ;

            return Ok(new JsonResult(products));
          
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult>UpdateProduct(ProductAppDomain.Models.DTO.Product product, int productId)
        {
            var productToUpdate = await _productRepository.GetProductByIdAsync(productId);

            if (productToUpdate != null)
            {
                productToUpdate.ModifiedDate = validateDateTime(productToUpdate.ModifiedDate.ToString()) ? productToUpdate.ModifiedDate : DateTime.Now;
                productToUpdate.SellStartDate = validateDateTime(productToUpdate.SellStartDate.ToString()) ? productToUpdate.SellStartDate : DateTime.Now;
            }
           

            if (productToUpdate == null)
            {
                return NotFound();
            }
            _mapper.Map(product, productToUpdate);

            try
            {
                await _productRepository.SaveChangesAsync();
            } catch (Exception ex)
            {
                var exception = ex as Exception;
                _logger.LogError($"Failed to update product: {exception.Message}");
                return BadRequest("Failed to update product, contact system admin");   

            }
           
            return Ok(new JsonResult(productToUpdate));

        }

        [HttpPost]
        public async Task<IActionResult> AddProduct (ProductRequestAdd producttoadd)
        {
                   
            var _product = _mapper.Map<ProductAppDomain.Product>(producttoadd);

            _product.ModifiedDate = validateDateTime(_product.ModifiedDate.ToString()) ? _product.ModifiedDate: DateTime.Now;
            _product.SellStartDate = validateDateTime(_product.SellStartDate.ToString()) ? _product.SellStartDate : DateTime.Now;


            _product.Rowguid= Guid.NewGuid();

            _product = await _productRepository.AddProductAsync(_product);
             await _productRepository.SaveChangesAsync();

            var response = _mapper.Map<ProductRequestAdd>(_product);

            return Ok(new JsonResult(response));

        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
           if (!await _productRepository.ProductExistsAsync(productId))
            {
                return NotFound();
            }

           var product = await _productRepository.GetProductByIdAsync(productId);
            await _productRepository.DeleteProduct(product);


            return Ok(new JsonResult(product));  //no need for that. 
        }

        private bool validateDateTime(string dateString)
        {
            DateTime temp;
            if (DateTime.TryParse(dateString, out temp))
            {
                return true;
            }
            return false;
        }
    }
}
