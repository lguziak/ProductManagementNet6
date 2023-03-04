using Microsoft.EntityFrameworkCore;
using ProductAppDomain.Services;
using ProductAppDomain;


namespace DatabaseContext
{
    public class ProductRepository : IProductRepository
    {
        private readonly DbProductContext _context;
        public ProductRepository(DbProductContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> ProductExistsAsync(int productId)
        {
            return await _context.Products.AnyAsync(p => p.ProductId == productId);
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task DeleteProduct(Product product)
        {
             _context.Products.Remove(product);
              await _context.SaveChangesAsync();
        }

       
        public async Task<Product?> GetProductByIdAsync(int proudctId)
        {
            return await _context.Products.SingleOrDefaultAsync(p=>p.ProductId== proudctId);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
         
            return await  _context.Products.OrderBy(p => p.Name).ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }

       
    }
}
