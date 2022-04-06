using System.ComponentModel.DataAnnotations;

namespace Mini_Ecom_APIS.Models
{
    public class details
    {
        [Key]
        public int DetailsID { get; set; }
        public int ProductID { get; set; }
        public string UserID { get; set; }
    }
}
