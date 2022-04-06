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
        public string Quantity { get; set; }
        public decimal LineTotal { get; set; }
        public int DetailsID { get; set; }
        public int CouponId { get; set; }
        [Display(Name = "Coupon Code")]
        public string CouponCode { get; set; }
        [Display(Name = "Percentage Amount")]
        public decimal PercentageAmount { get; set; }
        [Display(Name = "Money Amount")]
        public decimal MoneyAmount { get; set; }
        [Display(Name = "Valid Upto")]
        public DateTime ValidUpto { get; set; }
        public bool IsValid { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember Me")]
        public bool RememberMe { get; set; }
    }
}
