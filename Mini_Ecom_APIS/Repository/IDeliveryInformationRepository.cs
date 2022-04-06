using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public interface IDeliveryInformationRepository
    {
        Task<int> SavingDeliveryInfo(DeliveryInformationModel dim);
        Task<int> Update(cartdetailss cd, string id);
    }
}
