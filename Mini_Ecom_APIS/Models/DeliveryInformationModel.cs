using System.ComponentModel.DataAnnotations;

namespace Mini_Ecom_APIS.Models
{
    public class DeliveryInformationModel
    {

        [Key]
        public int Id { get; set; }
        [StringLength(500)]
        public string FullName { get; set; }
        [StringLength(500)]
        public string PhoneNumber { get; set; }
        [StringLength(500)]
        public string Province { get; set; }
        [StringLength(500)]
        public string City { get; set; }
        [StringLength(500)]
        public string Area { get; set; }
        [StringLength(500)]
        public string Address { get; set; }
        [StringLength(500)]
        public string UserId { get; set; }
    }
}
