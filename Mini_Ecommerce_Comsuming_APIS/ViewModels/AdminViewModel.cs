using Microsoft.AspNetCore.Identity;
using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public class AdminViewModel : IAdminViewModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public AdminViewModel(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this.roleManager = roleManager;
        }
        public async Task<IdentityResult> Create_Role(AdminModel model)
        {
            IdentityRole identityRole = new IdentityRole
            {
                Name = model.RoleName
            };
            IdentityResult result = await roleManager.CreateAsync(identityRole);
            return result;
        }
        public async Task<List<IdentityRole>> ListRoles()
        {
            var roles = roleManager.Roles.ToList();
            return roles;
        }
        public async Task<EditRoleModel> EditRole(string id)
        {
            IdentityRole role = await roleManager.FindByIdAsync(id);
            var model = new EditRoleModel
            {
                Id = role.Id,
                RoleName = role.Name
            };
            foreach (var user in _userManager.Users.ToList())
            {
                var IsInRole = await _userManager.IsInRoleAsync(user, role.Name);
                if (IsInRole)
                {
                    model.Users.Add(user.UserName);
                }
            }
            return model;
        }
        public async Task<IdentityResult> EditRole(EditRoleModel model)
        {
            IdentityResult result = new IdentityResult();
            var role = await roleManager.FindByIdAsync(model.Id);
            if (role != null)
            {
                role.Name = model.RoleName;
                result = await roleManager.UpdateAsync(role);
            }
            return result;
        }
        public async Task<List<AddRoleModel>> EditUsersInRole(string roleId)
        {
            List<AddRoleModel> model= new List<AddRoleModel>();
            var role = await roleManager.FindByIdAsync(roleId);
            if (role != null)
            {
                foreach (var user in _userManager.Users.ToList())
                {
                    var addrolesToUSER = new AddRoleModel
                    {
                        UserId = user.Id,
                        UserName = user.UserName
                    };

                    var IsInRole = await _userManager.IsInRoleAsync(user, role.Name);
                    if (IsInRole)
                    {
                        addrolesToUSER.IsSelected = true;
                    }
                    else
                    {
                        addrolesToUSER.IsSelected = false;
                    }
                    model.Add(addrolesToUSER);
                }
            }
            return model;
        }
    }
}
