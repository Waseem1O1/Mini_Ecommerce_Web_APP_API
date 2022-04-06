using Microsoft.EntityFrameworkCore;
using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public class CouponRepository : ICounponRepository
    {
        DataBaseContext _context;
        public CouponRepository(DataBaseContext context)
        {
            _context = context;
        }
        public async Task<int> SavingCoupon(CouponCodeModel ccm)
        {
            var Coupons = new CouponCodeModel()
            {
                CouponId = 0,
                CouponCode = ccm.CouponCode,
                PercentageAmount = ccm.PercentageAmount,
                MoneyAmount = 0,
                ValidUpto = ccm.ValidUpto,
                IsValid = true
            };
            _context.couponcodetbl.Add(Coupons);
            _context.SaveChanges();
            return Coupons.CouponId;
        }
        public async Task<CouponCodeModel> GetByIDAsync(string couponcode)
        {
            var couponDiscount = await _context.couponcodetbl.Where(x => x.CouponCode == couponcode).SingleOrDefaultAsync();
            return couponDiscount;
        }
    }
}
