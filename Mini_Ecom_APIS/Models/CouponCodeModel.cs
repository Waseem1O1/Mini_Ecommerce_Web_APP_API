using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mini_Ecom_APIS.Models
{
    public class CouponCodeModel 
    {
        [Key]
        public int CouponId { get; set; }
        [StringLength(500)]
        public string CouponCode { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal PercentageAmount { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal MoneyAmount { get; set; }    
        public DateTime ValidUpto { get; set; }    
        public bool IsValid { get; set; }    
    }
}
