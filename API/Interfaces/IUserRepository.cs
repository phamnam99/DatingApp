using API.Entities;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUserAsync();
        Task<AppUser?> GetUserByIdAsync(int id);
    }
}
