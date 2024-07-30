using Microsoft.EntityFrameworkCore;
using ToDoApp.DAL.Contracts;
using ToDoApp.DAL.Entities;

namespace ToDoApp.DAL.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly ToDoAppContext _context;
        public UserRepository(ToDoAppContext context)
        {
            _context = context;
        }

        public async Task<bool> UserExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            return user;
        }

        public async Task<User> GetUserAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
        }

    }
}
