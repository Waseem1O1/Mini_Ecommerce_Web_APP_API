using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public interface IProductRepository
    {
        Task<Product> GetByIDAsync(int id);
        Task<int> Saving(Product pm);
        Task Delete(int id);
        Task<int> SavingMultipleImages(MultipleImagesModel mim);
        Task<List<MultipleImagesModel>> GetAsyncMultipleImages(int Id);

    }
}
