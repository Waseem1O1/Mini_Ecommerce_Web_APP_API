using System.ComponentModel.DataAnnotations;

namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class CartModel
    {
        [Key]
        public int CartID { get; set; }
        public int UserID { get; set; }
    }
}
