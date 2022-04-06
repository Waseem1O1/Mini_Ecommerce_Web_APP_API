using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public interface IGetProductsRepository
    {
         Task<ProductsModel> GetAsync();
        Task<ProductsModel> GetAsync(int index);
        ProductsModel Getproducts(int currentPage);


    }
}
