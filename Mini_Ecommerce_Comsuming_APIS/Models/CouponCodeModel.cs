using System.ComponentModel.DataAnnotations;

namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class CouponCodeModel
    {
        [Key]
        public int CouponId { get; set; }
        [Display(Name ="Coupon Code")]
        public string CouponCode { get; set; }
        [Display(Name = "Percentage Amount")]
        public decimal PercentageAmount { get; set; }
        [Display(Name = "Money Amount")]
        public decimal MoneyAmount { get; set; }
        [Display(Name = "Valid Upto")]
        public DateTime ValidUpto { get; set; }
        public bool IsValid { get; set; }
    }
}
