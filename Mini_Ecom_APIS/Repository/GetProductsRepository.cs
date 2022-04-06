using Microsoft.EntityFrameworkCore;
using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public class GetProductsRepository : IGetProductsRepository
    {
        DataBaseContext _context;
        public GetProductsRepository(DataBaseContext context)
        {
            _context = context;
        }
        public async Task<ProductsModel> GetAsync()
        {
            var products = this.Getproducts(1);
            return products;
        }
        public async Task<ProductsModel> GetAsync(int index)
        {
            var products = this.Getproducts(index);
            return products;
        }
       
        public ProductsModel Getproducts(int currentPage)
        {
            int maxRows = 12;
            ProductsModel customerModel = new ProductsModel();

            customerModel.Products = (from products in _context.Products
                                      select products)
                        .OrderBy(pro => pro.ProductID)
                        .Skip((currentPage - 1) * maxRows)
                        .Take(maxRows).ToList();

            double pageCount = (double)((decimal)_context.Products.Count() / Convert.ToDecimal(maxRows));
            customerModel.PageCount = (int)Math.Ceiling(pageCount);

            customerModel.CurrentPageIndex = currentPage;

            return customerModel;
        }


    }
}
