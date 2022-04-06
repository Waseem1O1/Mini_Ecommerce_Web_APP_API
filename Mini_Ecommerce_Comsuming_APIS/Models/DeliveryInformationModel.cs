using System.ComponentModel.DataAnnotations;

namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class DeliveryInformationModel
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Full Name")]
        public string FullName { get; set; }
        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string Area { get; set; }
        public string Address { get; set; }
        public string UserId { get; set; }
    }
    public enum Province
    {
        Punjab,
        Balochistan,
        KhyberPakhtunkhwa,
        Sindh,
    }
    public enum Cities
    {
        Rawalpindi,
        Lahore,
        Gujrawanla,
        Sialkot,
        Karachi,
        Peshawar,
        Multan,
    }
}
