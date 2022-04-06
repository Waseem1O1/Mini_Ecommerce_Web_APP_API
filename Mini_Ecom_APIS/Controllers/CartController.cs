using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mini_Ecom_APIS.Models;
using Microsoft.EntityFrameworkCore;
using Mini_Ecom_APIS.Repository;

namespace Mini_Ecom_APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        DataBaseContext _context;
        public ICartRepository _CartRepository { get; }
        public CartController(DataBaseContext context, ICartRepository cartRepository)
        {
            _context = context;
            _CartRepository = cartRepository;
        }
        [HttpPost]
        public async Task<JsonResult> Saving(cartdetailss cd)
        {
            var cartdata = await _CartRepository.Saving(cd);
            return new JsonResult("Added");
        }
        //[HttpGet]
        //public async Task<JsonResult> GetAsync()
        //{
        //    cartdetailss cd = new cartdetailss();   
        //    var cartdetails = await _CartRepository.GetByIDAsync(cd);
        //    return new JsonResult(cartdetails);
        //}
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetJoinedData(string Id)
        {
            var JoinedData = await _CartRepository.GetAsync(Id);
            return new JsonResult(JoinedData);
        }
        [HttpDelete("{Id}")]
        public async Task<JsonResult> Delete(int Id)
        {
            await _CartRepository.Delete(Id);
            return new JsonResult("Deleted");
        }
        [HttpPut]
        public async Task<JsonResult> Update(cartdetailss cd)
        {
            var udateddata = await _CartRepository.Update(cd);
            return new JsonResult("Updated");
        }

    }
}
