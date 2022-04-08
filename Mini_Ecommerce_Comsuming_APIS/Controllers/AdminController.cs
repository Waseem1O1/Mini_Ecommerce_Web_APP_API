using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Mini_Ecommerce_Comsuming_APIS.Models;
using Mini_Ecommerce_Comsuming_APIS.ViewModels;

namespace Mini_Ecommerce_Comsuming_APIS.Controllers
{
    [Authorize(Roles = "Admin")]

    public class AdminController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;
        public readonly UserManager<IdentityUser> usermanager;
        public IAdminViewModel _AdmintViewModel { get; }
        public AdminController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> usermanager, IAdminViewModel AdminViewModel)
        {
            this.roleManager = roleManager;
            this.usermanager = usermanager;
            _AdmintViewModel = AdminViewModel;
        }

        [HttpGet]
        public IActionResult RegisterUsers()
        {
            var roles = roleManager.Roles.ToList();
            ViewBag.aspnetroleslist = new SelectList(roles.ToList(), "Id", "Name");
            return View();
        }
        [HttpGet]
        public IActionResult Create_Role()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create_Role(AdminModel model)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = await _AdmintViewModel.Create_Role(model);
                if (result.Succeeded)
                {
                    return RedirectToAction("ListRoles", "Admin");
                }
                foreach (IdentityError error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View(model);
        }
        [HttpGet]
        public async Task<IActionResult> ListRoles()
        {
            List<IdentityRole> roles = await _AdmintViewModel.ListRoles();
            return View(roles);
        }
        [HttpGet]
        public async Task<IActionResult> EditRole(string id)
        {
            EditRoleModel role = await _AdmintViewModel.EditRole(id);
            if (role == null)
            {
                ViewBag.ErrorMessage = $"Role with Id = {id} cannot be found";
                return View("NotFound");
            }
            return View(role);
        }

        [HttpPost]
        public async Task<IActionResult> EditRole(EditRoleModel model)
        {
            IdentityResult result = await _AdmintViewModel.EditRole(model);
            if (result.Succeeded)
            {
                return RedirectToAction("ListRoles");
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return View(model);
        }
        [HttpGet]
        public async Task<IActionResult> EditUsersInRole(string roleId)
        {
            ViewBag.roleId = roleId;
            List<AddRoleModel> result = await _AdmintViewModel.EditUsersInRole(roleId);
            return View(result);
        }
        [HttpPost]
        public async Task<IActionResult> EditUsersInRole(List<AddRoleModel> model, string roleId)
        {
            var role = await roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                ViewBag.ErrorMessage = $"Role with Id = {roleId} cannot be found";
                return View("NotFound");
            }
            for (int i = 0; i < model.Count; i++)
            {
                var user = await usermanager.FindByIdAsync(model[i].UserId);
                IdentityResult result = null;
                if (model[i].IsSelected && !(await usermanager.IsInRoleAsync(user, role.Name)))
                {
                    result = await usermanager.AddToRoleAsync(user, role.Name);
                }
                else if (!model[i].IsSelected && await usermanager.IsInRoleAsync(user, role.Name))
                {
                    result = await usermanager.RemoveFromRoleAsync(user, role.Name);
                }
                else
                {
                    continue;
                }

                if (result.Succeeded)
                {
                    if (i < (model.Count - 1))
                        continue;
                    else
                        return RedirectToAction("EditRole", new { Id = roleId });
                }
            }

            return RedirectToAction("EditRole", new { Id = roleId });
        }
    }
}
