using System.ComponentModel.DataAnnotations;

namespace Mini_Ecom_APIS.Models
{
    public class ProductsModel
    {

        public List<Product> Products { get; set; }
        public int CurrentPageIndex { get; set; }
        public int PageCount { get; set; }
    }

    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal Price { get; set; }
        public byte[] Image { get; set; }
    }
}
