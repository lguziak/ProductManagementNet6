namespace ProductAppDomain.Models.DTO
{
    public class ProductRequestAdd
    {

        public string Name { get; set; } = null!;

        public string ProductNumber { get; set; } = null!;

        public string? Color { get; set; }

        public decimal StandardCost { get; set; }

        public decimal ListPrice { get; set; }

        public string? Size { get; set; }

        public string? Weight { get; set; }

        public int? ProductCategoryId { get; set; }

        public int? ProductModelId { get; set; }

        public DateTime SellStartDate { get; set; }

        public string? SellEndDate { get; set; }

        public string? DiscontinuedDate { get; set; }

        public byte[]? ThumbNailPhoto { get; set; }

        public string? ThumbnailPhotoFileName { get; set; }

        public Guid Rowguid { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual ProductCategory? ProductCategory { get; set; }
        public virtual ProductModel? ProductModel { get; set; }
    }
}
