using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Business_Logic_Layer
{
    public class ProductBLL
    {
        private Data_Access_Layer.ProductDAL _DAL;
        public ProductBLL()
        {
            _DAL = new Data_Access_Layer.ProductDAL(null,null);
        }
        public Task<List<ProductModel>>  GetallProductsBLL()
        {
            return _DAL.GetAllProductsDAL();
        }
    }
}