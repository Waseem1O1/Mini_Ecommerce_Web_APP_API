using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Mini_Ecommerce_Comsuming_APIS.Models;
using Mini_Ecommerce_Comsuming_APIS.ViewModels;

var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
var connectionString = builder.Configuration.GetConnectionString("AuthenticationDbContextContextConnection");
builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 28))));
builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<AppDBContext>();
builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IProductsViewModel, ProductViewModel>();
builder.Services.AddScoped<IAccountViewModel, AccountViewModel>();
builder.Services.AddTransient<ICouponViewModel, CouponViewModel>();
builder.Services.AddTransient<IDeliveryInformationViewModel, DeliveryInformationViewModel>();
//builder.Services.AddDistributedMemoryCache();
//builder.Services.AddMemoryCache();
//builder.Services.AddSession(options =>
//{
//    options.Cookie.Name = ".MiniEcommerce.Session";
//    options.IdleTimeout = TimeSpan.FromSeconds(10);
//    options.Cookie.IsEssential = true;
//});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
//app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Product}/{action=Index}/{id?}");
app.Run();
