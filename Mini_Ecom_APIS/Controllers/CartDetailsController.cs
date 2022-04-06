using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mini_Ecom_APIS.Models;
using Mini_Ecom_APIS.Repository;

namespace Mini_Ecom_APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartDetailsController : ControllerBase
    {
        DataBaseContext _context;
        public ICartRepository _CartRepository { get; }
        public CartDetailsController(DataBaseContext context, ICartRepository cartRepository)
        {
            _context = context;
            _CartRepository = cartRepository;
        }

        [HttpPost]
        public async Task<JsonResult> GetAsync(cartdetailss cd)
        {
            var cartdetails = await _CartRepository.GetByIDAsync(cd);
            return new JsonResult(cartdetails);
        }
        [HttpDelete("{Id}")]
        public async Task<JsonResult> DeleteCart(string Id)
        {
            await _CartRepository.DeleteCart(Id);
            return new JsonResult("Deleted");
        }
       
    }
}
