using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public interface IProductsViewModel
    {
        Task<ProductsModel> Index();
        Task<ProductsModel> IndexPost(int pageindex);
        Task<int> Saving(List<IFormFile> files, Product mp);
        Task<int> SavingMultipleImages(List<IFormFile> files, MultipleImagesModel mim);
        Task<ProductModel> Details(int id);
        Task<ProductModel> Detailsbuynow(int id);
        Task<int> SavingCart(CombinedModel mp);
        Task<int> Delete(int id);
        Task<List<ProductModel>> getJoinedlist(string id);
        Task<List<ProductModel>> getJoinedlistCheckout(string id);
        Task<int> RemoveFromCart(int id);
       Task<int> UpdateCart(int id,string userid, decimal linetotal, decimal price, string quantity);
        Task<List<MultipleImagesModel>> GetMultipleImages(int id);
        Task<int> DeleteCart(string id);
    }
}
