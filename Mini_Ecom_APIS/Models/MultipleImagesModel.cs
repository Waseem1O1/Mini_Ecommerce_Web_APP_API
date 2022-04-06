using System.ComponentModel.DataAnnotations;

namespace Mini_Ecom_APIS.Models
{
    public class MultipleImagesModel
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public byte[] Image { get; set; }
    }
}
