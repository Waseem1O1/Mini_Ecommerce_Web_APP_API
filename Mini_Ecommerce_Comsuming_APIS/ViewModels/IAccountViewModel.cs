using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public interface IAccountViewModel
    {
        Task<int> Login(LoginViewModel model);
        Task<int> Logincheckout(CombinedModel user);
        Task<int> Register(RegisterViewModel model);
        Task<int> Logout();
    }
}
