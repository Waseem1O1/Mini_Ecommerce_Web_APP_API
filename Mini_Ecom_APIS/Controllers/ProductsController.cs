using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mini_Ecom_APIS.Models;
using Mini_Ecom_APIS.Repository;

namespace Mini_Ecom_APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public IProductRepository _ProductRepository { get; }
        public IGetProductsRepository _GetProductRepository { get; }
        public ProductsController(IProductRepository productRepository,IGetProductsRepository getProductRepository)
        {
            _ProductRepository = productRepository;
            _GetProductRepository = getProductRepository;
        }
        [HttpPost]
        public async Task<JsonResult> Saving(Product pm)
        {
            var product = await _ProductRepository.Saving(pm);
            return new JsonResult(product);
        }
        [HttpGet]
        public async Task<JsonResult> GetAsync()
        {
            var ProductS = await _GetProductRepository.GetAsync();
            return new JsonResult(ProductS);
        }
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetbyID(int Id)
        {
            var Product = await _ProductRepository.GetByIDAsync(Id);
            return new JsonResult(Product);
        }
        [HttpDelete("{Id}")]
        public async Task<JsonResult> Delete(int Id)
        {
            await _ProductRepository.Delete(Id);
            return new JsonResult("deleted successfully");
        }
    }
}
