using Microsoft.AspNetCore.Identity;
using Mini_Ecommerce_Comsuming_APIS.Helper;
using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public class DeliveryInformationViewModel : IDeliveryInformationViewModel
    {
        private IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<IdentityUser> _userManager;
        //public const string SessionKeyName = "_Name";
        IConfiguration _configuration;
        HttpClient? client;
        APIRequest APIURL;
        public DeliveryInformationViewModel(UserManager<IdentityUser> userManager, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            APIURL = new APIRequest(configuration);
        }
        public async Task<int> Saving(CombinedModel cm)
        {
            string? name = "";
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                name = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
            }
            else
            {
                name = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            }
            client = APIURL.initialDeliveryInfo();
            cm.DIM.UserId = name;
            var postTask =await client.PostAsJsonAsync<DeliveryInformationModel>("", cm.DIM);
            if (postTask.IsSuccessStatusCode)
            {
                return 1;
            }
            return 0;
        }
        public async Task<int> UpdateUserID(CartDetailsModel cdm)
        {
            string? name = "";
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                name = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
            }
            else
            {
                name = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            }
            cdm.UserID = name;
            cdm.Quantity = _httpContextAccessor.HttpContext.Request.Cookies["UserID"];
            client = APIURL.initialDeliveryInfo();
            var postTaskCart = await client.PutAsJsonAsync("", cdm);
            if (postTaskCart.IsSuccessStatusCode)
            {
                return 1;
            }
            return 0;
        }
    }
}
