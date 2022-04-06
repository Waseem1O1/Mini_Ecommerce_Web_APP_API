using Mini_Ecom_APIS.Models;

namespace Mini_Ecom_APIS.Repository
{
    public class DeliveryInformationRepository : IDeliveryInformationRepository
    {
        DataBaseContext _context;
        public DeliveryInformationRepository(DataBaseContext context)
        {
            _context = context;
        }
        public async Task<int> SavingDeliveryInfo(DeliveryInformationModel dim)
        {
            var deliveryinfo = new DeliveryInformationModel()
            {
                Id = 0,
                FullName = dim.FullName,
                PhoneNumber = dim.PhoneNumber,
                Province = dim.Province,
                City = dim.City,
                Area = dim.Area,
                Address = dim.Address,
                UserId = dim.UserId
            };
            _context.deliveryinformation.Add(deliveryinfo);
            _context.SaveChanges();
            return deliveryinfo.Id;
        }
        public async Task<int> Update(cartdetailss cd,string id)
        {
            var UpdateDATA = (from p in _context.cartdetailss where p.UserID == id select p);
            foreach (var UpdateDATAGet in UpdateDATA)
            {
                UpdateDATAGet.UserID = cd.UserID;
            }
            _context.SaveChanges();
            return 1;
        }
    }
}
