using Microsoft.EntityFrameworkCore;

namespace Mini_Ecom_APIS.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<cartdetailss> cartdetailss { get; set; }
        public DbSet<carts> carts { get; set; }
        public DbSet<CouponCodeModel> couponcodetbl { get; set; }
        public DbSet<DeliveryInformationModel> deliveryinformation { get; set; }
        public DbSet<MultipleImagesModel> multipleimages { get; set; }

    }
}
