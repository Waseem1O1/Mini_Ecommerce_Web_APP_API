using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Mini_Ecommerce_Comsuming_APIS.Models;
using Mini_Ecommerce_Comsuming_APIS.ViewModels;

namespace Mini_Ecommerce_Comsuming_APIS.Controllers
{
    public class ProductController : Controller
    {
        public IProductsViewModel _ProductViewModel { get; }
        public ICouponViewModel _CouponViewModel { get; }
        public IAccountViewModel _AccountViewModel { get; }
        public IDeliveryInformationViewModel _DeliveryInformationRepository { get; }
        private IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<IdentityUser> _userManager;
        public ProductController(UserManager<IdentityUser> userManager, IHttpContextAccessor httpContextAccessor, IDeliveryInformationViewModel DeliveryInformationRepository, IProductsViewModel ProductViewModel, ICouponViewModel CouponViewModel, IAccountViewModel AccountViewModel)
        {
            _ProductViewModel = ProductViewModel;
            _CouponViewModel = CouponViewModel;
            _AccountViewModel = AccountViewModel;
            _DeliveryInformationRepository = DeliveryInformationRepository;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }
        string key = "Keyvalue";
        string value;
        public async Task<ActionResult> Index()
        {
            CartDetailsModel cdm = new CartDetailsModel();
            CookieOptions cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(10)
            };
            if (Request.Cookies["Keyvalue"] == "Cerulean" || Request.Cookies["Keyvalue"] == null)
            {
                value = "Cerulean";
            }
            else
            {
                if (Request.Cookies["Keyvalue"] == "Darkly")
                {
                    value = "Darkly";
                }
            }
            if (_userManager.GetUserId(HttpContext.User) != null)
            {
                await _DeliveryInformationRepository.UpdateUserID(cdm);
            }
            Response.Cookies.Append(key, value, cookieOptions);
            var ProductList = await _ProductViewModel.Index();
            ViewBag.Nopagination = ProductList.PageCount;
            return View(ProductList);
        }
        [HttpPost]
        public async Task<ActionResult> Index(int currentPageIndex)
        {
            var ProductList = await _ProductViewModel.IndexPost(currentPageIndex);
            ViewBag.Nopagination = ProductList.PageCount;
            return View(ProductList);
        }
        public ActionResult Add()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Add(List<IFormFile> files, Product pm)
        {
            MultipleImagesModel mim = new MultipleImagesModel();
            var Productid = await _ProductViewModel.Saving(files, pm);
            mim.ProductId = Productid;
            var add = await _ProductViewModel.SavingMultipleImages(files, mim);
            if (add == true && Productid != 0)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            TempData["ID"] = id;
            var productlist = new CombinedModel();
            productlist.PM = await _ProductViewModel.Details(id);
            productlist.MIM = await _ProductViewModel.GetMultipleImages(id);
            return View(productlist);
        }
        [HttpPost]
        public async Task<IActionResult> SaveCart(CombinedModel cm)
        {
            var savedcart = await _ProductViewModel.SavingCart(cm);
            if (savedcart == 1)
            {
                return RedirectToAction("Cart");
            }
            return RedirectToAction("Index");
        }
        public async Task<ActionResult> Delete(int id)
        {
            HttpResponseMessage res = await _ProductViewModel.Delete(id);
            if (res.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        public async Task<ActionResult> DeleteCart(string id)
        {
            HttpResponseMessage res = await _ProductViewModel.DeleteCart(id);
            if (res.IsSuccessStatusCode)
            {
                return RedirectToAction("Cart");
            }
            return View();
        }
        decimal Getdiscountedamount = 0;
        decimal remainingAmount = 0;
        decimal DiscountInPercentage = 0;
        public async Task<ActionResult> Cart(CombinedModel cm, CartDetailsModel cdm, string id)
        {

            if (_userManager.GetUserId(_httpContextAccessor.HttpContext.User) != null)
            {
                await _DeliveryInformationRepository.UpdateUserID(cdm);
            }
            cm.ProductList = await _ProductViewModel.getJoinedlist(id);
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
                            Getdiscountedamount = ((DiscountInPercentage / 100) * cm.DM.total);
                            remainingAmount = (cm.DM.total - Getdiscountedamount);
                            cm.DM.payable = remainingAmount + cm.DM.shipping;
                            cm.DM.discountpercentage = DiscountInPercentage;
                            cm.DM.discount = Getdiscountedamount;
                        }
                        else
                        {
                            cm.DM.payable = cm.DM.total + cm.DM.shipping;
                            ViewBag.InvalidCoupon = "Invalid Coupon!";
                        }
                    }
                    else
                    {
                        cm.DM.payable = cm.DM.total + cm.DM.shipping;
                        ViewBag.InvalidCoupon = "Invalid Coupon!";
                    }
                }
            }
            if (cm.ProductList.Count == 0)
            {
                TempData["NoItems"] = "No Items Found";
            }
            return View(cm);
        }
        public async Task<ActionResult> RemoveFromCart(int id)
        {
           HttpResponseMessage res= await _ProductViewModel.RemoveFromCart(id);
            if(res.IsSuccessStatusCode)
            {
                return RedirectToAction("Cart");
            }
            return View();
        }
        public async Task<ActionResult> UpdateCart(int id, string userid, decimal linetotal, decimal price, string quantity)
        {
            var update = await _ProductViewModel.UpdateCart(id, userid, linetotal, price, quantity);
            if (update == 1)
            {
                return RedirectToAction("Cart");
            }
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(CombinedModel user, string id, CartDetailsModel cdm)
        {
            Microsoft.AspNetCore.Identity.SignInResult result = new Microsoft.AspNetCore.Identity.SignInResult();
            if (user.LVM.Email != null)
            {
                result = await _AccountViewModel.Logincheckout(user);
            }
            var productlist = new CombinedModel();
            productlist.ProductList = await _ProductViewModel.getJoinedlist(id);
            if (result.Succeeded)
            {
                return RedirectToAction("Cart", productlist);
            }
            else
            {
                ViewBag.modal = "123";
                ModelState.AddModelError(string.Empty, "Invalid Login Attempt");
                return View("Cart", productlist);
            }
        }
    }
}
