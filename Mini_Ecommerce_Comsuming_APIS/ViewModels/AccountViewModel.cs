using Microsoft.AspNetCore.Identity;
using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public class AccountViewModel : IAccountViewModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public AccountViewModel(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this.roleManager = roleManager;
        }
        public async Task<int> Login(LoginViewModel user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.Email, user.Password, user.RememberMe, false);
            if (result.Succeeded)
            {

                return 1;
            }
            return 0;
        }
        public async Task<int> Register(RegisterViewModel model)
        {
            var user = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                var role = await roleManager.FindByIdAsync(model.Id);

                if (role == null)
                {
                    return 2;
                }
                else
                {
                    result = await _userManager.AddToRoleAsync(user, role.Name);
                }
                return 1;
            }

            return 0;
        }
        public async Task<int> Logout()
        {
            await _signInManager.SignOutAsync();
            return 1;
        }
        public async Task<int> Logincheckout(CombinedModel user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.LVM.Email, user.LVM.Password, user.LVM.RememberMe, false);
            if (result.Succeeded)
            {
                return 1;
            }
            return 0;
        }
    }
}
