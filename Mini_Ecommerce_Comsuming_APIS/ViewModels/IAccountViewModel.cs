using Microsoft.AspNetCore.Identity;
using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public interface IAccountViewModel
    {
        Task<SignInResult> Login(LoginViewModel user);
        Task<IdentityResult> Register(RegisterViewModel model);
        Task Logout();
        Task<SignInResult> Logincheckout(CombinedModel user);
    }
}
