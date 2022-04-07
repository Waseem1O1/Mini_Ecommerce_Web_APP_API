using Microsoft.EntityFrameworkCore;
using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public class ProductRepository : IProductRepository
    {
        DataBaseContext _context;
        public ProductRepository(DataBaseContext context)
        {
            _context = context;
        }
      
        public async Task<Product> GetByIDAsync(int id)
        {
            var ProductByID = await _context.Products.Where(x => x.ProductID == id).SingleOrDefaultAsync();
            return ProductByID;
        }
        public async Task<int> Saving(Product pm)
        {
            var objproduct = new Product()
            {
                ProductID = 0,
                ProductName = pm.ProductName,
                ProductDescription = pm.ProductDescription,
                Price = pm.Price,
                Image = pm.Image
            };
            _context.Products.Add(objproduct);
            await _context.SaveChangesAsync();
            return objproduct.ProductID;
        }
        public async Task Delete(int id)
        {
            var product = new Product()
            {
                ProductID = id
            };
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
        public async Task<int> SavingMultipleImages(MultipleImagesModel mim)
        {
            var objmim = new MultipleImagesModel()
            {
                Id = 0,
                ProductId = mim.ProductId,
                Image = mim.Image
            };
            _context.multipleimages.Add(objmim);
            await _context.SaveChangesAsync();
            return objmim.Id;
        }
        public async Task<List<MultipleImagesModel>> GetAsyncMultipleImages(int Id)
        {
            var results = from mi in _context.multipleimages
                          join p in _context.Products on mi.ProductId equals p.ProductID
                          where (mi.ProductId == Id)
                          select new
                          {
                              mi.Image
                          };
            var list = await results.ToListAsync().ConfigureAwait(false);
            return list
                    .Select(r => new MultipleImagesModel()
                    {
                        Image = r.Image
                    }).ToList();
        }
    }
}
