using Microsoft.AspNetCore.Mvc;
using Mini_Ecommerce_Comsuming_APIS.Models;
using Mini_Ecommerce_Comsuming_APIS.ViewModels;

namespace Mini_Ecommerce_Comsuming_APIS.Controllers
{
    public class CouponCodeController : Controller
    {
        public ICouponViewModel _CouponViewModel { get; }
        public CouponCodeController(ICouponViewModel CouponViewModel)
        {
            _CouponViewModel = CouponViewModel;
        }
        public ActionResult AddCouponCode()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> AddCouponCode(CouponCodeModel ccm)
        {
            var add = await _CouponViewModel.Saving(ccm);
            return View();
        }
    }
}
