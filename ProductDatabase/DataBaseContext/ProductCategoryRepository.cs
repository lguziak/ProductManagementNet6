using DatabaseContext;
using Microsoft.EntityFrameworkCore;
using ProductAppDomain;
using ProductAppDomain.Services;


namespace DataBaseContext
{
    public class ProductCategoryRepository : IProductCategoryRepository
    {

        private readonly DbProductContext _context;

        public ProductCategoryRepository(DbProductContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void DeleteProductCategoryAsync(int productId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ProductCategory>> GetProducCategoriesAsync()
        {
            return await _context.ProductCategories.Where( pc => pc.ParentProductCategoryId != null).OrderBy(p => p.Name).ToListAsync();
        }

        public Task<ProductCategory?> GetProductCategoryAsync(int proudctId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveChangesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ProductCategory> UpdateProductCategoryAsync(ProductCategory productCategory)
        {
            throw new NotImplementedException();
        }
    }
}
