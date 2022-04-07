using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Mini_Ecommerce_Comsuming_APIS.Models;
using Mini_Ecommerce_Comsuming_APIS.ViewModels;

namespace Mini_Ecommerce_Comsuming_APIS.Controllers
{
    public class AccountController : Controller
    {
        public IAccountViewModel _AccountViewModel { get; }
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<IdentityUser> _userManager;
        public IDeliveryInformationViewModel _DeliveryInformationRepository { get; }
        public AccountController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IAccountViewModel AccountViewModel, IDeliveryInformationViewModel DeliveryInformationRepository)
        {
            _userManager = userManager;
            this.roleManager = roleManager;
            _AccountViewModel = AccountViewModel;
            _DeliveryInformationRepository = DeliveryInformationRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Register()
        {
            var roles = roleManager.Roles.ToList();
            ViewBag.aspnetroleslist = new SelectList(roles.ToList(), "Id", "Name");
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _AccountViewModel.Register(model);
                if (result.Succeeded)
                {
                    return RedirectToAction("Login", "Account");
                }
                ModelState.AddModelError(string.Empty, "Error Occured Cannot Register New User");
            }
            return View(model);
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel user)
        {
            if (ModelState.IsValid)
            {
                Microsoft.AspNetCore.Identity.SignInResult result = await _AccountViewModel.Login(user);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Product");
                }
                ModelState.AddModelError(string.Empty, "Invalid Login Attempt");
            }
            return View(user);
        }
        public async Task<IActionResult> Logout()
        {
            if (Request.Cookies["UserID"] != null)
            {
                string key = "UserID";
                string value = Guid.NewGuid().ToString();
                CookieOptions cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(-1)
                };
                Response.Cookies.Append(key, value, cookieOptions);
            }
            await _AccountViewModel.Logout();
            return RedirectToAction("privacy", "Home");
        }
    }
}
