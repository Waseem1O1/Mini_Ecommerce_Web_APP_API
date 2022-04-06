using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mini_Ecom_APIS.Repository;

namespace Mini_Ecom_APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetProductsController : ControllerBase
    {
        public IGetProductsRepository _GetProductRepository { get; }
        public GetProductsController(IGetProductsRepository getProductRepository)
        {
            _GetProductRepository = getProductRepository;
        }
        [HttpGet]
        public async Task<JsonResult> GetAsync()
        {
            var ProductS = await _GetProductRepository.GetAsync();
            return new JsonResult(ProductS);
        }
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetAsyncPost(int Id)
        {
            var ProductS = await _GetProductRepository.GetAsync(Id);
            return new JsonResult(ProductS);
        }
    }
}
