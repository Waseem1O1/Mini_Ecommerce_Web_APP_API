using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class CartModel
    {
        [Key]
        public int CartID { get; set; }
        [Column(TypeName = "varchar(500)")]
        public string UserID { get; set; }
    }
}
