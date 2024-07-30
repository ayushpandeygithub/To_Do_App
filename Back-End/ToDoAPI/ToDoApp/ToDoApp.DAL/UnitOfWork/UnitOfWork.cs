using ToDoApp.DAL.Entities;

namespace ToDoApp.DAL.UnitOfWork
{
    public class UnitOfWork
    {
        private readonly ToDoAppContext _context;
        public UnitOfWork(ToDoAppContext context)
        {
            _context = context; 
        }
        public async Task<int> Save()
        {
         return await _context.SaveChangesAsync();
        }
    }
}
