namespace ProductAppDomain.Services
{
    public interface IProductRepository
    {

        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product?> GetProductByIdAsync(int proudctId);
        Task DeleteProduct(Product product);           
        Task<Product> AddProductAsync(Product product);
        Task<bool> ProductExistsAsync(int productId);    
        Task<bool> SaveChangesAsync();
    }
}
