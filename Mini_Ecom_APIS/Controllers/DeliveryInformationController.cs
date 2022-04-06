using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mini_Ecom_APIS.Models;
using Mini_Ecom_APIS.Repository;

namespace Mini_Ecom_APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryInformationController : ControllerBase
    {
        DataBaseContext _context;
        public IDeliveryInformationRepository _DeliveryInformationRepository { get; }
        public DeliveryInformationController(DataBaseContext context, IDeliveryInformationRepository DeliveryInformationRepository)
        {
            _context = context;
            _DeliveryInformationRepository = DeliveryInformationRepository;
        }
        [HttpPost]
        public async Task<JsonResult> Saving(DeliveryInformationModel dim)
        {
            var cartdata = await _DeliveryInformationRepository.SavingDeliveryInfo(dim);
            return new JsonResult("Added");
        }
        [HttpPut]

        public async Task<JsonResult> Update(cartdetailss cd)
        {
            string Id =cd.Quantity;
            var udateddata = await _DeliveryInformationRepository.Update(cd,Id);
            return new JsonResult("Updated");
        }
    }
}
