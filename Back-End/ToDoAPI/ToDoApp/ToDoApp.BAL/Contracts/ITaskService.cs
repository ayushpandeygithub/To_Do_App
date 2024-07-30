
using ToDoApp.Models.DTO;

namespace ToDoApp.BAL.Contracts
{
    public interface ITaskService
    {
        Task<TaskDTO> AddTaskAsync(TaskDTO taskDto);
        Task<TaskDTO> GetTaskAsync(int taskId);
        Task<TaskDTO> UpdateTaskAsync(TaskDTO taskDto);
        Task<bool> DeleteTaskAsync(int taskId);
        Task<IEnumerable<TaskDTO>> GetCompletedTasksByUserIdAsync(int userId);
        Task<IEnumerable<TaskDTO>> GetActiveTasksByUserIdAsync(int userId);
        Task<bool> ToggleTaskStatusAsync(int taskId, int userId);
    }
}
