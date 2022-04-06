using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mini_Ecom_APIS.Models;
using Mini_Ecom_APIS.Repository;

namespace Mini_Ecom_APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MultipleImagesController : ControllerBase
    {
        DataBaseContext _context;
        public IProductRepository _ProductRepository { get; }
        public MultipleImagesController(DataBaseContext context, IProductRepository ProductRepository)
        {
            _context = context;
            _ProductRepository = ProductRepository;
        }
        [HttpPost]
        public async Task<JsonResult> Saving(MultipleImagesModel mim)
        {
            var cartdata = await _ProductRepository.SavingMultipleImages(mim);
            return new JsonResult("Added");
        }
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetJoinedData(int Id)
        {
            var JoinedData = await _ProductRepository.GetAsyncMultipleImages(Id);
            return new JsonResult(JoinedData);
        }
    }
}
