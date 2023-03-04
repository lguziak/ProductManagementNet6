using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProductAppDomain;

namespace DatabaseContext
{
    public partial class DbProductContext : DbContext
    {
        private readonly IConfiguration _config;
        public DbProductContext(IConfiguration config)
        {
            _config = config;
        }

        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductCategory> ProductCategories { get; set; } = null!;
        public virtual DbSet<ProductDescription> ProductDescriptions { get; set; } = null!;
        public virtual DbSet<ProductModel> ProductModels { get; set; } = null!;
        public virtual DbSet<ProductModelProductDescription> ProductModelProductDescriptions { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder bldr)
        {
            base.OnConfiguring(bldr);

            
            string projectDirectory = Directory.GetParent(Environment.CurrentDirectory).FullName;
            string dbPath = Path.Combine(projectDirectory, "ProductDatabase\\DB\\Products.db");
            string datasource = "data source=" + dbPath;
          
            bldr.UseSqlite(datasource);

          //  bldr.UseSqlite(_config.GetConnectionString("DbLiteConnectionString"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>(entity =>
            {
                entity.ToTable("ProductCategory", "SalesLT");

                entity.HasComment("High-level product categorization.");

                entity.HasIndex(e => e.Name, "AK_ProductCategory_Name")
                    .IsUnique();

                entity.HasIndex(e => e.Rowguid, "AK_ProductCategory_rowguid")
                    .IsUnique();

                entity.Property(e => e.ProductCategoryId)
                    .HasColumnName("ProductCategoryID")
                    .HasComment("Primary key for ProductCategory records.");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())")
                    .HasComment("Date and time the record was last updated.");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasComment("Category description.");

                entity.Property(e => e.ParentProductCategoryId)
                    .HasColumnName("ParentProductCategoryID")
                    .HasComment("Product category identification number of immediate ancestor category. Foreign key to ProductCategory.ProductCategoryID.");

                entity.Property(e => e.Rowguid)
                    .HasColumnName("rowguid")
                    .HasDefaultValueSql("(newid())")
                    .HasComment("ROWGUIDCOL number uniquely identifying the record. Used to support a merge replication sample.");

                entity.HasOne(d => d.ParentProductCategory)
                    .WithMany(p => p.InverseParentProductCategory)
                    .HasForeignKey(d => d.ParentProductCategoryId)
                    .HasConstraintName("FK_ProductCategory_ProductCategory_ParentProductCategoryID_ProductCategoryID");
            });

            modelBuilder.Entity<ProductDescription>(entity =>
            {
                entity.ToTable("ProductDescription", "SalesLT");

                entity.HasComment("Product descriptions in several languages.");

                entity.HasIndex(e => e.Rowguid, "AK_ProductDescription_rowguid")
                    .IsUnique();

                entity.Property(e => e.ProductDescriptionId)
                    .HasColumnName("ProductDescriptionID")
                    .HasComment("Primary key for ProductDescription records.");

                entity.Property(e => e.Description)
                    .HasMaxLength(400)
                    .HasComment("Description of the product.");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())")
                    .HasComment("Date and time the record was last updated.");

                entity.Property(e => e.Rowguid)
                    .HasColumnName("rowguid")
                    .HasDefaultValueSql("(newid())")
                    .HasComment("ROWGUIDCOL number uniquely identifying the record. Used to support a merge replication sample.");
            });

            modelBuilder.Entity<ProductModel>(entity =>
            {
                entity.ToTable("ProductModel", "SalesLT");

                entity.HasIndex(e => e.Name, "AK_ProductModel_Name")
                    .IsUnique();

                entity.HasIndex(e => e.Rowguid, "AK_ProductModel_rowguid")
                    .IsUnique();

                entity.HasIndex(e => e.CatalogDescription, "PXML_ProductModel_CatalogDescription");

                entity.Property(e => e.ProductModelId).HasColumnName("ProductModelID");

                entity.Property(e => e.CatalogDescription).HasColumnType("xml");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Rowguid)
                    .HasColumnName("rowguid")
                    .HasDefaultValueSql("(newid())");
            });

            modelBuilder.Entity<ProductModelProductDescription>(entity =>
            {
                entity.HasKey(e => new { e.ProductModelId, e.ProductDescriptionId, e.Culture })
                    .HasName("PK_ProductModelProductDescription_ProductModelID_ProductDescriptionID_Culture");

                entity.ToTable("ProductModelProductDescription", "SalesLT");

                entity.HasComment("Cross-reference table mapping product descriptions and the language the description is written in.");

                entity.HasIndex(e => e.Rowguid, "AK_ProductModelProductDescription_rowguid")
                    .IsUnique();

                entity.Property(e => e.ProductModelId)
                    .HasColumnName("ProductModelID")
                    .HasComment("Primary key. Foreign key to ProductModel.ProductModelID.");

                entity.Property(e => e.ProductDescriptionId)
                    .HasColumnName("ProductDescriptionID")
                    .HasComment("Primary key. Foreign key to ProductDescription.ProductDescriptionID.");

                entity.Property(e => e.Culture)
                    .HasMaxLength(6)
                    .IsFixedLength()
                    .HasComment("The culture for which the description is written");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())")
                    .HasComment("Date and time the record was last updated.");

                entity.Property(e => e.Rowguid)
                    .HasColumnName("rowguid")
                    .HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.ProductDescription)
                    .WithMany(p => p.ProductModelProductDescriptions)
                    .HasForeignKey(d => d.ProductDescriptionId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.ProductModel)
                    .WithMany(p => p.ProductModelProductDescriptions)
                    .HasForeignKey(d => d.ProductModelId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }

    }

   



}