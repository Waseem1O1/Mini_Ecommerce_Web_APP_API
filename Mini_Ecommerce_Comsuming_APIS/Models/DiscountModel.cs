namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class DiscountModel
    {
        public string couponcode { get; set; }
        public decimal shipping { get; set; }
        public decimal subtotal { get; set; }
        public decimal total { get; set; }
        public decimal price { get; set; }
        public decimal payable { get; set; }
        public decimal discountpercentage { get; set; }
        public decimal discount { get; set; }
    }
}
