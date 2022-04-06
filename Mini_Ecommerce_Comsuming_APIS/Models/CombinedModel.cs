namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class CombinedModel
    {
        public List<ProductModel> ProductList { set; get; }
        public DeliveryInformationModel DIM { get; set; }
        public ProductModel PM { get; set; }
        public LoginViewModel LVM { get; set; }
        public DiscountModel DM { get; set; }
        public List<MultipleImagesModel> MIM { get; set; }


    }
}
