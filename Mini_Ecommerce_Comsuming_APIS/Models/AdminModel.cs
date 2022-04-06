using System.ComponentModel.DataAnnotations;

namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class AdminModel
    {
        [Required]
        [Display(Name = "Role")]
        public string RoleName { get; set; }
    }
}
