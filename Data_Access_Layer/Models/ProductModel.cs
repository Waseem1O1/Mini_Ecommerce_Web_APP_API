using System.ComponentModel.DataAnnotations;

namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class ProductModel
    {
        [Key]
        public int ProductID { get; set; }
        [Display(Name = "Product Name")]
        public string ProductName { get; set; }
        [Display(Name = "Product Description")]
        public string ProductDescription { get; set; }
        [Display(Name = "Product Price")]
        public decimal Price { get; set; }
        [Display(Name = "Image")]

        [MaxLength(1000)]
        public byte[] Image { get; set; }
        public string UserID { get; set; }
        public decimal Quantity { get; set; }
        public decimal LineTotal { get; set; }
        public int DetailsID { get; set; }
    }
}
