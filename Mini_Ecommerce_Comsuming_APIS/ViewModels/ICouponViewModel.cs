using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public interface ICouponViewModel
    {
        Task<int> Saving(CouponCodeModel ccm);
        Task<CouponCodeModel> Details(string couponcode);
    }
}
