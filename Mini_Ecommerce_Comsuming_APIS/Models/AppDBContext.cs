using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.Models
{
    public class AppDBContext : IdentityDbContext
    {
        private readonly DbContextOptions _options;
        public AppDBContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }
    }
}
