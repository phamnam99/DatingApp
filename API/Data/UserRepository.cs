using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public void Update(AppUser user)
        {


        }
        public async Task<bool> SaveAllAsync()
        {

        }
        public async Task<IEnumerable<AppUser>> GetUserAsync()
        {

        }
        public async Task<AppUser?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
