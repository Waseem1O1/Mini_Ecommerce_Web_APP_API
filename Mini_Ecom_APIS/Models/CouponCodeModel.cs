using System.ComponentModel.DataAnnotations;
namespace Mini_Ecom_APIS.Models
{
    public class CouponCodeModel
    {
        [Key]
        public int CouponId { get; set; }    
        public string CouponCode { get; set; }    
        public decimal PercentageAmount { get; set; }    
        public decimal MoneyAmount { get; set; }    
        public DateTime ValidUpto { get; set; }    
        public bool IsValid { get; set; }    
    }
}
