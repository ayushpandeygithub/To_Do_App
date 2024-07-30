using Microsoft.EntityFrameworkCore;
using ToDoApp.DAL.Contracts;
using ToDoApp.DAL.Entities;
using Task = System.Threading.Tasks.Task;

namespace ToDoApp.DAL.Implementations
{
    public class TaskRepository : ITaskRepository
    { 
        private readonly ToDoAppContext _context;
        public TaskRepository(ToDoAppContext context)
        {
          _context = context;
        }
        public async Task<Entities.Task> AddTaskAsync(Entities.Task task)
        {
            await _context.Tasks.AddAsync(task);
            return task;
        }

        public async Task<Entities.Task> GetTaskAsync(int taskId)
        {
            return await _context.Tasks.FindAsync(taskId);
        }


        public async Task<Entities.Task> UpdateTaskAsync(Entities.Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            return task;
        }

        public async Task<bool> DeleteTaskAsync(int taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task != null)
            {
                task.IsDeleted = true;
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Entities.Task>> GetCompletedTasksByUserIdAsync(int userId)
        {
            return 
                await _context.Tasks
                                 .Where(t => t.UserId == userId && (t.IsDeleted == null || t.IsDeleted == false)&&(t.IsCompleted==true))
                                 .ToListAsync();
        }
        public async Task<IEnumerable<Entities.Task>> GetActiveTasksByUserIdAsync(int userId)
        {
            return
                await _context.Tasks
                                 .Where(t => t.UserId == userId && (t.IsDeleted == null || t.IsDeleted == false) && (t.IsCompleted == false))
                                 .ToListAsync();
        }

        public async Task<bool> ToggleTaskStatusAsync(int taskId, int userId)
        {
            var task = await _context.Tasks
                              .Where(t => t.TaskId == taskId && t.UserId == userId)
                              .FirstOrDefaultAsync();
            if (task == null)
                return false;

            task.IsCompleted = !task.IsCompleted;
            _context.Tasks.Update(task);
            return true;
        }
    }
}
