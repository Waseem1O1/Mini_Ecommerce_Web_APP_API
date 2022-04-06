using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public interface ICounponRepository
    {
        Task<int> SavingCoupon(CouponCodeModel ccm);
        Task<CouponCodeModel> GetByIDAsync(string couponcode);
    }
}
