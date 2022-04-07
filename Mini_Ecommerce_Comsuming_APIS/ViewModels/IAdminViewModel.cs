using Microsoft.AspNetCore.Identity;
using Mini_Ecommerce_Comsuming_APIS.Models;

namespace Mini_Ecommerce_Comsuming_APIS.ViewModels
{
    public interface IAdminViewModel
    {
        Task<IdentityResult> Create_Role(AdminModel model);
        Task<List<IdentityRole>> ListRoles();
        Task<EditRoleModel> EditRole(string id);
        Task<IdentityResult> EditRole(EditRoleModel model);
        Task<List<AddRoleModel>> EditUsersInRole(string roleId);
    }
}
