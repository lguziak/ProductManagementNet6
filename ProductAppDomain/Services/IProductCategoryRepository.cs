namespace ProductAppDomain.Services
{
    public interface IProductCategoryRepository
    {

        Task<IEnumerable<ProductCategory>> GetProducCategoriesAsync();
        Task<ProductCategory?> GetProductCategoryAsync(int proudctId);

        void DeleteProductCategoryAsync(int productId);

        Task<ProductCategory> UpdateProductCategoryAsync(ProductCategory productCategory);

        Task<bool> SaveChangesAsync();
    }
}
