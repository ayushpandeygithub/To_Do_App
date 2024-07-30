using Nelibur.ObjectMapper;
using ToDoApp.BAL.Contracts;
using ToDoApp.DAL.Contracts;
using ToDoApp.DAL.UnitOfWork;
using ToDoApp.Models.DTO;

namespace ToDoApp.BAL.Implementations
{
    public class TaskServices : ITaskService
    { 
        private readonly ITaskRepository _taskRepository;
        private readonly UnitOfWork _unitOfWork;
        public TaskServices(ITaskRepository taskRepository,UnitOfWork unitOfWork)
        {
            _taskRepository = taskRepository;
            _unitOfWork = unitOfWork;
            InitializeMapping();
        }
        private void InitializeMapping()
        {
            TinyMapper.Bind<TaskDTO, DAL.Entities.Task>(config =>
            {
                config.Ignore(dest => dest.TaskId);
            });

            TinyMapper.Bind<DAL.Entities.Task, TaskDTO>(config =>
            {
            });
        }

        public async Task<TaskDTO> AddTaskAsync(TaskDTO taskDto)
        {
            var task = TinyMapper.Map<DAL.Entities.Task>(taskDto);
            task.CreatedDate = DateTime.Now;

            var addedTask = await _taskRepository.AddTaskAsync(task);
            await _unitOfWork.Save();
            return TinyMapper.Map<TaskDTO>(addedTask);
        }

        public async Task<TaskDTO> GetTaskAsync(int taskId)
        {
            var task = await _taskRepository.GetTaskAsync(taskId);
            if (task == null)
                return null;

            return TinyMapper.Map<TaskDTO>(task);
        }

        public async Task<TaskDTO> UpdateTaskAsync(TaskDTO taskDto)
        {
            var existingTask = await _taskRepository.GetTaskAsync(taskDto.TaskId!.Value);
            if (existingTask == null)
                return null;
            TinyMapper.Map(taskDto, existingTask);

            var updatedTask = await _taskRepository.UpdateTaskAsync(existingTask);
            await _unitOfWork.Save();
            return TinyMapper.Map<TaskDTO>(updatedTask);
        }

        public async Task<bool> DeleteTaskAsync(int taskId)
        {
          bool res =  await _taskRepository.DeleteTaskAsync(taskId);
            if(res) await _unitOfWork.Save();
            return res;
        }

        public async Task<IEnumerable<TaskDTO>> GetCompletedTasksByUserIdAsync(int userId)
        {
            var tasks = await _taskRepository.GetCompletedTasksByUserIdAsync(userId);
            return tasks.Select(task => TinyMapper.Map<TaskDTO>(task));
        }
        public async Task<IEnumerable<TaskDTO>> GetActiveTasksByUserIdAsync(int userId)
        {
            var tasks = await _taskRepository.GetActiveTasksByUserIdAsync(userId);
            return tasks.Select(task => TinyMapper.Map<TaskDTO>(task));
        }
        public async Task<bool> ToggleTaskStatusAsync(int taskId, int userId)
        {
           bool res =  await _taskRepository.ToggleTaskStatusAsync(taskId, userId);
            await _unitOfWork.Save();
            return res;
        }
    }
}
