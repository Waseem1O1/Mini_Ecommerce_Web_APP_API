using System.ComponentModel.DataAnnotations;

namespace Mini_Ecom_APIS.Models
{
    public class DeliveryInformationModel
    {

        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string Area { get; set; }
        public string Address { get; set; }
        public string UserId { get; set; }
    }
}
