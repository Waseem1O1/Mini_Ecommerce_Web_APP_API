using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mini_Ecom_APIS.Models
{
    public class ProductDetailsModel
    {
        [Key]
        public int DetailsID { get; set; }
        public int ProductID { get; set; }
        public decimal Quantity { get; set; }
        [ForeignKey("CartID")]
        public int CID { get; set; }
        public string UserID { get; set; }
        public decimal LineTotal { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal Price { get; set; }
        public byte[] Image { get; set; }
    }
}
