using Microsoft.AspNetCore.Identity;
using Mini_Ecommerce_Comsuming_APIS.HelperClass;
using Mini_Ecommerce_Comsuming_APIS.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Data_Access_Layer
{
    public class ProductDAL
    {
        public const string SessionKeyName = "_Name";
        AppDBContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        ProductHelperClass ProductHelper = new ProductHelperClass();
        CartHelperClass CartHelperHelper = new CartHelperClass();
        public ProductDAL(UserManager<IdentityUser> userManager, AppDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        public async Task<List<ProductModel>> GetAllProductsDAL()
        {
            List<ProductModel> ProductList = new List<ProductModel>();
            //Getting Base Address
            HttpClient client = ProductHelper.Initial();
            HttpClient clientcart = CartHelperHelper.Initialcart();
            HttpResponseMessage res = await client.GetAsync("");
            if (res.IsSuccessStatusCode)
            {
                //Reading Data using HttpResponseMessage
                var result = res.Content.ReadAsStringAsync().Result;
                //Deserializing 
                ProductList = JsonConvert.DeserializeObject<List<ProductModel>>(result);
            }

            return  ProductList;
        }
    }
}