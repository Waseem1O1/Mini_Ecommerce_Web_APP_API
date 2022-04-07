using Microsoft.AspNetCore.Identity;
using Mini_Ecommerce_Comsuming_APIS.Helper;
using Mini_Ecommerce_Comsuming_APIS.Models;
using Newtonsoft.Json;
namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public class ProductViewModel : IProductsViewModel
    {
        private IHttpContextAccessor _httpContextAccessor;
        //public const string SessionKeyName = "_Name";
        IConfiguration _configuration;
        private readonly UserManager<IdentityUser> _userManager;
        HttpClient? client;
        APIRequest APIURL;
        public ProductViewModel(UserManager<IdentityUser> userManager, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _configuration = configuration;
            APIURL = new APIRequest(configuration);
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ProductsModel> Index()
        {
            if (_httpContextAccessor.HttpContext.Request.Cookies["UserID"] == null)
            {
                string key = "UserID";
                string value = Guid.NewGuid().ToString();
                CookieOptions cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(10)
                };
                _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value, cookieOptions);

            }
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                string key = "UserID";
                string value = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value);
            }

            ProductsModel ProductList = new ProductsModel();
            client = APIURL.initialGetProducts();
            HttpResponseMessage res = await client.GetAsync("");
            if (res.IsSuccessStatusCode)
            {
                var result = res.Content.ReadAsStringAsync().Result;
                ProductList = JsonConvert.DeserializeObject<ProductsModel>(result);
            }
            return ProductList;
        }
        public async Task<ProductsModel> IndexPost(int pageindex)
        {
            ProductsModel ProductList = new ProductsModel();
            client = APIURL.initialGetProducts();
            HttpResponseMessage res = await client.GetAsync("" + pageindex);
            if (res.IsSuccessStatusCode)
            {
                var result = res.Content.ReadAsStringAsync().Result;
                ProductList = JsonConvert.DeserializeObject<ProductsModel>(result);
            }
            return ProductList;
        }
        string productId = "";
        public async Task<int> Saving(List<IFormFile> files, Product mp)
        {
            foreach (IFormFile postedfiles in files)
            {
                if (postedfiles != null)
                {
                    if (postedfiles.Length > 0)
                    {
                        var fileName = Path.GetFileName(postedfiles.FileName);
                        var fileExtension = Path.GetExtension(fileName);
                        var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExtension);
                        using (var target = new MemoryStream())
                        {
                            postedfiles.CopyTo(target);
                            mp.Image = target.ToArray();
                            client = APIURL.initialProducts();
                            var postTask = await client.PostAsJsonAsync<Product>("", mp);
                            using (HttpContent content1 = postTask.Content)
                            {
                                string productId1 = await content1.ReadAsStringAsync();
                                if (productId != null)
                                {
                                    productId = productId1;
                                    goto outofLoop;
                                }
                            }

                        }
                    }
                }
            }
        outofLoop:
            return Convert.ToInt32(productId);
        }
        int result = 0;
        public async Task<bool> SavingMultipleImages(List<IFormFile> files, MultipleImagesModel mim)
        {
            foreach (IFormFile postedfiles in files)
            {
                if (postedfiles != null)
                {
                    if (postedfiles.Length > 0)
                    {
                        var fileName = Path.GetFileName(postedfiles.FileName);
                        var fileExtension = Path.GetExtension(fileName);
                        var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExtension);
                        using (var target = new MemoryStream())
                        {
                            postedfiles.CopyTo(target);
                            mim.Image = target.ToArray();
                            client = APIURL.initialMultiple();
                            await client.PostAsJsonAsync<MultipleImagesModel>("", mim);
                        }
                    }
                }
            }
            return true;
        }
        public async Task<ProductModel> Details(int id)
        {
            var ProductDetails = new CombinedModel();
            client = APIURL.initialProducts();
            HttpResponseMessage res = await client.GetAsync("" + id);
            if (res.IsSuccessStatusCode)
            {
                var result = res.Content.ReadAsStringAsync().Result.ToString();
                ProductDetails.PM = JsonConvert.DeserializeObject<ProductModel>(result);
            }
            return ProductDetails.PM;
        }
        public async Task<ProductModel> Detailsbuynow(int id)
        {
            CombinedModel CM = new CombinedModel();
            client = APIURL.initialProducts();
            HttpResponseMessage res = await client.GetAsync("" + id);
            if (res.IsSuccessStatusCode)
            {
                var result = res.Content.ReadAsStringAsync().Result.ToString();
                CM.PM = JsonConvert.DeserializeObject<ProductModel>(result);
            }
            return CM.PM;
        }
        int detailid = 0;
        string name = "";
        public async Task<int> SavingCart(CombinedModel cm)
        {
            CartDetailsModel cdm = new CartDetailsModel();
            details dt = new details();
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                string key = "UserID";
                string value = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                name = value;
                _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value);
            }
            else
            {
                name = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            }
            client = APIURL.initialGetCartdetails();
            cdm.ProductID = cm.PM.ProductID;
            cdm.UserID = name;
            cdm.Quantity = "2";
            HttpResponseMessage res = await client.PostAsJsonAsync<CartDetailsModel>("", cdm);
            CartDetailsModel cdm1 = new CartDetailsModel();
            if (res.IsSuccessStatusCode)
            {
                var result = res.Content.ReadAsStringAsync().Result.ToString();
                cdm1 = JsonConvert.DeserializeObject<CartDetailsModel>(result);
            }
            if (cdm1 != null)
            {
                cm.PM.DetailsID = cdm1.DetailsID;
                cm.PM.LineTotal = Convert.ToDecimal(cm.PM.Price) * Convert.ToDecimal(cm.PM.Quantity);
                cm.PM.LineTotal = Convert.ToDecimal(cdm1.LineTotal) + Convert.ToDecimal(cm.PM.LineTotal);
                cm.PM.Quantity = (Convert.ToDecimal(cdm1.Quantity) + Convert.ToDecimal(cm.PM.Quantity)).ToString();
                cdm.DetailsID = cm.PM.DetailsID;
                cdm.LineTotal = cm.PM.LineTotal;
                cdm.Quantity = cm.PM.Quantity;
                cdm.UserID = name;
                client = APIURL.initialCart();
                var postTaskCart = client.PutAsJsonAsync("", cdm);
                postTaskCart.Wait();
                var resultcart = postTaskCart.Result;
                if (resultcart.IsSuccessStatusCode)
                {
                    return 1;
                }
            }
            else
            {
                cm.PM.UserID = name;
                var linetot = Convert.ToDecimal(cm.PM.Price) * Convert.ToDecimal(cm.PM.Quantity);
                cm.PM.LineTotal = linetot;
                client = APIURL.initialCart();
                var postTaskproduct = client.PostAsJsonAsync<ProductModel>("", cm.PM);
                postTaskproduct.Wait();
                var resultproduct = postTaskproduct.Result;
                if (resultproduct.IsSuccessStatusCode)
                {
                    return 1;
                }
            }
            return 0;
        }
        public async Task<HttpResponseMessage> Delete(int id)
        {
            client = APIURL.initialProducts();
            var res = await client.DeleteAsync("" + id);
            return res;
        }
        public async Task<HttpResponseMessage> DeleteCart(string id)
        {
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                string key = "UserID";
                string value = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                id = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value);
            }
            else
            {
                id = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            }
            client = APIURL.initialGetCartdetails();
            var res = await client.DeleteAsync("" + id);
            return res;
        }
        public async Task<List<ProductModel>> getJoinedlist(string id)
        {
            string name = "";
            var CM = new CombinedModel();
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                string key = "UserID";
                string value = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                name = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value);
            }
            else
            {
                name = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            }
            id = name;
            client = APIURL.initialCart();
            HttpResponseMessage res = await client.GetAsync("" + id);
            if (res.IsSuccessStatusCode)
            {
                var result = res.Content.ReadAsStringAsync().Result;
                CM.ProductList = JsonConvert.DeserializeObject<List<ProductModel>>(result);
            }
            return CM.ProductList;
        }
        public async Task<List<MultipleImagesModel>> GetMultipleImages(int id)
        {
            var CM = new CombinedModel();

            client = APIURL.initialMultiple();
            HttpResponseMessage res = await client.GetAsync("" + id);
            if (res.IsSuccessStatusCode)
            {
                var result = res.Content.ReadAsStringAsync().Result;
                CM.MIM = JsonConvert.DeserializeObject<List<MultipleImagesModel>>(result);
            }
            return CM.MIM;
        }
        public async Task<List<ProductModel>> getJoinedlistCheckout(string id)
        {
            string name = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            var CM = new CombinedModel();
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                string key = "UserID";
                string value = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                name = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value);
            }
            else
            {
                goto PleaseLogin;
            }
            id = name;
            client = APIURL.initialCart();
            HttpResponseMessage res = await client.GetAsync("" + id);
            if (res.IsSuccessStatusCode)
            {
                var result = res.Content.ReadAsStringAsync().Result;
                CM.ProductList = JsonConvert.DeserializeObject<List<ProductModel>>(result);
            }
            return CM.ProductList;
        PleaseLogin:
            return CM.ProductList;
        }
        public async Task<HttpResponseMessage> RemoveFromCart(int id)
        {
            string name = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            CartDetailsModel cdm = new CartDetailsModel();
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                string key = "UserID";
                string value = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                name = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value);
            }
            else
            {
                name = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            }
            cdm.ProductID = id;
            cdm.UserID = name;
            cdm.Quantity = "2";
            client = APIURL.initialGetCartdetails();
            HttpResponseMessage res1 = await client.PostAsJsonAsync<CartDetailsModel>("", cdm);
            if (res1.IsSuccessStatusCode)
            {
                var result = res1.Content.ReadAsStringAsync().Result.ToString();
                cdm = JsonConvert.DeserializeObject<CartDetailsModel>(result);
            }
            int DetailID = cdm.DetailsID;
            client = APIURL.initialCart();
            HttpResponseMessage res = await client.DeleteAsync("" + DetailID);
            return res;
        }
        public async Task<int> UpdateCart(int id, string userid, decimal linetotal, decimal price, string quantity)
        {
            CartDetailsModel cd = new CartDetailsModel();
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                string key = "UserID";
                string value = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                userid = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
                _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value);
            }
            else
            {
                userid = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            }
            cd.ProductID = id;
            cd.UserID = userid;
            cd.Quantity = "2";
            client = APIURL.initialGetCartdetails();
            HttpResponseMessage res1 = await client.PostAsJsonAsync<CartDetailsModel>("", cd);
            if (res1.IsSuccessStatusCode)
            {
                var result = res1.Content.ReadAsStringAsync().Result.ToString();
                cd = JsonConvert.DeserializeObject<CartDetailsModel>(result);
            }
            int DetailID = cd.DetailsID;
            cd.DetailsID = DetailID;
            cd.LineTotal = Convert.ToDecimal(price) * Convert.ToDecimal(quantity);
            cd.Quantity = quantity;
            cd.UserID = userid;
            client = APIURL.initialCart();
            var postTaskCart = client.PutAsJsonAsync("", cd);
            postTaskCart.Wait();
            var resultcart = postTaskCart.Result;
            if (resultcart.IsSuccessStatusCode)
            {
                return 1;
            }
            return 1;
        }
    }
}
