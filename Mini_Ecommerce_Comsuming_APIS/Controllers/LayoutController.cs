using Microsoft.AspNetCore.Mvc;

namespace Mini_Ecommerce_Comsuming_APIS.Controllers
{
    public class LayoutController : Controller
    {
        public IActionResult Darkly()
        {
            string key = "Keyvalue";
            string value = "Darkly";
            if (Request.Cookies["Keyvalue"] != null)
            {
                Response.Cookies.Append(key, value);
            }
            return RedirectToAction("Index", "Product");
        }
        public IActionResult Cerulean()
        {
            string key = "Keyvalue";
            string value = "Cerulean";
            if (Request.Cookies["Keyvalue"] != null)
            {
                Response.Cookies.Append(key, value);
            }
            return RedirectToAction("Index", "Product");
        }

    }
}
