using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public interface ICartRepository
    {
        Task<int> Saving(cartdetailss cd);
        Task<List<ProductDetailsModel>> GetAsync(string Id);
        Task Delete(int id);
        Task<int> Update(cartdetailss cd);
        Task<cartdetailss> GetByIDAsync(cartdetailss cd);
        Task DeleteCart(string userID);
    }
}
