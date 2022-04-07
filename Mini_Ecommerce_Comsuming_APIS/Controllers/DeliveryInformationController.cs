using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Mini_Ecommerce_Comsuming_APIS.Models;
using Mini_Ecommerce_Comsuming_APIS.ViewModels;

namespace Mini_Ecommerce_Comsuming_APIS.Controllers
{
    public class DeliveryInformationController : Controller
    {
        private IHttpContextAccessor _httpContextAccessor;
        public const string SessionKeyName = "_Name";
        public IDeliveryInformationViewModel _DeliveryInformationViewModel { get; }
        private readonly UserManager<IdentityUser> _userManager;
        public IProductsViewModel _ProductsViewModel { get; }
        public IAccountViewModel _AccountViewModel { get; }
        public ICouponViewModel _CouponViewModel { get; }
        public DeliveryInformationController(IDeliveryInformationViewModel DeliveryInformationViewModel, UserManager<IdentityUser> userManager, IProductsViewModel ProductsViewModel, ICouponViewModel CouponViewModel, IHttpContextAccessor httpContextAccessor, IAccountViewModel AccountViewModel)
        {
            _DeliveryInformationViewModel = DeliveryInformationViewModel;
            _ProductsViewModel = ProductsViewModel;
            _CouponViewModel = CouponViewModel;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            _AccountViewModel = AccountViewModel;
        }
        decimal Getdiscountedamount = 0;
        decimal remainingAmount = 0;
        decimal DiscountInPercentage = 0;
        public async Task<IActionResult> DeliveryInformation(CombinedModel cm, int id)
        {
            cm.PM = await _ProductsViewModel.Detailsbuynow(id);
            TempData["ID"] = id;
            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                _httpContextAccessor.HttpContext.Session.SetString(SessionKeyName, _userManager.GetUserId(_httpContextAccessor.HttpContext.User));
                var name = _httpContextAccessor.HttpContext.Session.GetString(SessionKeyName);
            }
            else
            {
                ViewBag.modal = "openmodel";
            }
            if (cm.DM != null)
            {
                if (cm.DM.couponcode != null)
                {

                    var getcoupenDiscount = await _CouponViewModel.Details(cm.DM.couponcode);
                    if (getcoupenDiscount != null)
                    {
                        if (getcoupenDiscount.ValidUpto >= DateTime.Now)
                        {
                            DiscountInPercentage = getcoupenDiscount.PercentageAmount;
                            Getdiscountedamount = ((DiscountInPercentage / 100) * cm.DM.price);
                            remainingAmount = (cm.DM.price - Getdiscountedamount);
                            cm.DM.payable = remainingAmount + cm.DM.shipping;
                            cm.DM.discountpercentage = DiscountInPercentage;
                            cm.DM.discount = Getdiscountedamount;
                            return View("DeliveryInformation", cm);
                        }
                        else
                        {
                            cm.DM.payable = cm.DM.price + cm.DM.shipping;
                            ViewBag.InvalidCoupon = "Invalid Coupon!";
                        }
                    }
                    else
                    {
                        cm.DM.payable = cm.DM.price + cm.DM.shipping;
                        ViewBag.InvalidCoupon = "Invalid Coupon!";
                    }
                }
            }
            return View(cm);
        }
        [HttpPost]
        public async Task<IActionResult> DeliveryInformationPost(int id, CombinedModel cm)
        {
            var details = await _ProductsViewModel.Detailsbuynow(id);
            var add = await _DeliveryInformationViewModel.Saving(cm);
            return View(details);
        }
        public async Task<IActionResult> Checkout(string id, decimal discountpercent, decimal discount, decimal total, decimal remaining)
        {
            var productlist = new CombinedModel();
            var product = await _ProductsViewModel.getJoinedlistCheckout(id);
            productlist.ProductList = product;
            productlist.ProductList = await _ProductsViewModel.getJoinedlist(id);
            if (product == null)
            {
                ViewBag.modal = "login";
                return View("Cart", productlist);
            }
            else
            {
                ViewBag.subtotal = total;
                ViewBag.disc = discountpercent;
                ViewBag.discount = discount;
                ViewBag.remaining = remaining;
                return View(productlist);
            }
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(CombinedModel user, int pid)
        {
            user.PM = await _ProductsViewModel.Detailsbuynow(pid);
            Microsoft.AspNetCore.Identity.SignInResult result = await _AccountViewModel.Logincheckout(user);
            if (result.Succeeded)
            {
                return View("DeliveryInformation", user);
            }
            else
            {
                ViewBag.modal = "123";
                ModelState.AddModelError(string.Empty, "Invalid Login Attempt");
                return View("DeliveryInformation", user);
            }
        }
    }
}
