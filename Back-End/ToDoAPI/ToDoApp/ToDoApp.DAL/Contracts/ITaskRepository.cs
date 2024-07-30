
namespace ToDoApp.DAL.Contracts
{
    public interface ITaskRepository
    {
        Task<Entities.Task> AddTaskAsync(Entities.Task task);
        Task<Entities.Task> GetTaskAsync(int taskId);
        Task<Entities.Task> UpdateTaskAsync(Entities.Task task);
        Task<bool> DeleteTaskAsync(int userId);
        Task<IEnumerable<Entities.Task>> GetCompletedTasksByUserIdAsync(int userId);
        Task<IEnumerable<Entities.Task>> GetActiveTasksByUserIdAsync(int userId);
        Task<bool> ToggleTaskStatusAsync(int taskId, int userId);
    }
}
