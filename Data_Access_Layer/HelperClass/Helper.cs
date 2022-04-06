namespace Mini_Ecommerce_Comsuming_APIS.HelperClass
{
    public class ProductHelperClass
    {
        public HttpClient Initial()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://localhost:7056/api/Products");
            return client;
        }
    }
    public class CartHelperClass
    {
        public HttpClient Initialcart()
        {
            var clientcart = new HttpClient();
            clientcart.BaseAddress = new Uri("https://localhost:7056/api/Cart");
            return clientcart;
        }
    }
}
