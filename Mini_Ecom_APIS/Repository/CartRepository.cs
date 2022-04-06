using Microsoft.EntityFrameworkCore;
using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public class CartRepository : ICartRepository
    {
        DataBaseContext _context;
        public CartRepository(DataBaseContext context)
        {
            _context = context;
        }
        public async Task<int> Saving(cartdetailss cd)
        {
            var cartss = new carts()
            {
                CartID = 0,
                UserID = cd.UserID
            };
            _context.carts.Add(cartss);
            _context.SaveChanges();
            int lastCartID = _context.carts.Max(item => item.CartID);
            var cartdetails = new cartdetailss()
            {
                DetailsID = 0,
                ProductID = cd.ProductID,
                Quantity = cd.Quantity,
                CID = lastCartID,
                UserID = cd.UserID,
                LineTotal = cd.LineTotal
            };
            _context.cartdetailss.Add(cartdetails);
            _context.SaveChanges();
            return cartdetails.CID;
        }
        public async Task<List<ProductDetailsModel>> GetAsync(string Id)
        {
            var results = from cd in _context.cartdetailss
                          join c in _context.carts on cd.CID equals c.CartID
                          join p in _context.Products on cd.ProductID equals p.ProductID
                          where (cd.UserID == Id)
                          select new
                          {
                              p.ProductID,
                              p.ProductName,
                              p.ProductDescription,
                              p.Price,
                              p.Image,
                              cd.Quantity,
                              cd.LineTotal
                          };
            var list = await results.ToListAsync().ConfigureAwait(false);
            return list
                    .Select(r => new ProductDetailsModel()
                    {
                        ProductID = r.ProductID,
                        ProductName = r.ProductName,
                        ProductDescription = r.ProductDescription,
                        Price = r.Price,
                        Image = r.Image,
                        Quantity = Convert.ToDecimal(r.Quantity),
                        LineTotal = r.LineTotal,
                    }).ToList();
        }
        public async Task Delete(int id)
        {
            var cartdet = new cartdetailss()
            {
                DetailsID = id
            };
            _context.cartdetailss.Remove(cartdet);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCart(string userID)
        {
            var DeleteRecords = (from p in _context.cartdetailss where p.UserID == userID select p);
            foreach (var deleted in DeleteRecords)
            {
                _context.cartdetailss.Remove(deleted);
            }
            await _context.SaveChangesAsync();
        }
        public async Task<int> Update(cartdetailss cd)
        {
            var UpdateDATA = (from p in _context.cartdetailss where p.DetailsID == cd.DetailsID select p);
            foreach (var UpdateDATAGet in UpdateDATA)
            {
                UpdateDATAGet.Quantity = cd.Quantity;
                UpdateDATAGet.LineTotal = cd.LineTotal;
                UpdateDATAGet.UserID = cd.UserID;
            }
            _context.SaveChanges();
            return 1;
        }
        public async Task<cartdetailss> GetByIDAsync(cartdetailss cd)
        {
            var detailIDs = _context.cartdetailss.Where(c => Convert.ToInt32(c.ProductID) == cd.ProductID && c.UserID == cd.UserID).SingleOrDefault();
            return detailIDs;
        }
    }
}
