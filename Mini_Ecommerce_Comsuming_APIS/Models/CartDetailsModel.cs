using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class CartDetailsModel
    {
        [Key]
        public int DetailsID { get; set; }
        public int ProductID { get; set; }
        [Column(TypeName = "varchar(500)")]
        public string Quantity { get; set; }
        [ForeignKey("CartID")]
        public int CID { get; set; }
        [Column(TypeName = "varchar(500)")]
        public string UserID { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal LineTotal { get; set; }
    }
}
