using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public interface IDeliveryInformationViewModel
    {
        Task<int> Saving(CombinedModel cmm);
        Task<int> UpdateUserID(CartDetailsModel cdm);
    }
}
