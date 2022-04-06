using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mini_Ecom_APIS.Models;
using Mini_Ecom_APIS.Repository;

namespace Mini_Ecom_APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponCodeController : ControllerBase
    {
        DataBaseContext _context;
        public ICounponRepository _CouponRepository { get; }
        public CouponCodeController(DataBaseContext context, ICounponRepository CouponRepository)
        {
            _context = context;
            _CouponRepository = CouponRepository;
        }
        [HttpPost]
        public async Task<JsonResult> Saving(CouponCodeModel ccm)
        {
            var cartdata = await _CouponRepository.SavingCoupon(ccm);
            return new JsonResult("Added");
        }
        [HttpGet("{couponcode}")]
        public async Task<JsonResult> GetbyID(string couponcode)
        {
            var Product = await _CouponRepository.GetByIDAsync(couponcode);
            return new JsonResult(Product);
        }
    }
}
