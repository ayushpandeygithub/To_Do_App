using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.BAL.Contracts;
using ToDoApp.Models.DTO;
using ToDoApp.Models.Response;

namespace ToDoApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : Controller
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(TaskDTO taskDto)
        {
            var response = new ApiResponse<TaskDTO>();

                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    response.Status = 2;
                    response.Message = "Unauthorized";
                    return Unauthorized(response);
                }

                taskDto.UserId = userId;
                var addedTask = await _taskService.AddTaskAsync(taskDto);
                response.Status = 1;
                response.Data = addedTask;
                return Ok(response);
        }

        [HttpGet("{id}/get-task-by-id")]
        public async Task<IActionResult> GetTask(int id)
        {
            var response = new ApiResponse<TaskDTO>();

                var task = await _taskService.GetTaskAsync(id);
                if (task == null)
                {
                    response.Status = 2;
                    response.Message = "Task not found";
                    return NotFound(response);
                }

                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId) || task.UserId != userId)
                {
                    response.Status = 2;
                    response.Message = "Unauthorized";
                    return Unauthorized(response);
                }

                response.Status = 1;
                response.Data = task;
                return Ok(response);
           
        }

        [HttpGet("completed-tasks")]
        public async Task<IActionResult> GetCompletedTasksForUser()
        {
            var response = new ApiResponse<IEnumerable<TaskDTO>>();

                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    response.Status = 2;
                    response.Message = "Unauthorized";
                    return Unauthorized(response);
                }

                var tasks = await _taskService.GetCompletedTasksByUserIdAsync(userId);
                response.Status = 1;
                response.Data = tasks;
                return Ok(response);
        }

        [HttpGet("active-tasks")]
        public async Task<IActionResult> GetActiveTasksForUser()
        {
            var response = new ApiResponse<IEnumerable<TaskDTO>>();
                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    response.Status = 2;
                    response.Message = "Unauthorized";
                    return Unauthorized(response);
                }

                var tasks = await _taskService.GetActiveTasksByUserIdAsync(userId);
                response.Status = 1;
                response.Data = tasks;
                return Ok(response);
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> UpdateTask(int id, TaskDTO taskDto)
        {
            var response = new ApiResponse<TaskDTO>();

                if (id != taskDto.TaskId)
                {
                    response.Status = 2;
                    response.Message = "Task ID mismatch.";
                    return BadRequest(response);
                }

                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    response.Status = 2;
                    response.Message = "Unauthorized";
                    return Unauthorized(response);
                }

                taskDto.UserId = userId;
                var updatedTask = await _taskService.UpdateTaskAsync(taskDto);
                if (updatedTask == null)
                {
                    response.Status = 2;
                    response.Message = "Task not found";
                    return NotFound(response);
                }

                response.Status = 1;
                response.Data = updatedTask;
                return Ok(response);
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var response = new ApiResponse<bool>();
                var task = await _taskService.GetTaskAsync(id);
                if (task == null)
                {
                    response.Status = 2;
                    response.Message = "Task not found";
                    return NotFound(response);
                }

                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId) || task.UserId != userId)
                {
                    response.Status = 2;
                    response.Message = "Unauthorized";
                    return Unauthorized(response);
                }
                await _taskService.DeleteTaskAsync(id);
                response.Status = 1;
                response.Data = true;
                return Ok(response);
            
        }

        [HttpPut("{taskId}/toggle-task-status")]
        public async Task<IActionResult> ToggleTaskStatus(int taskId)
        {
            var response = new ApiResponse<bool>();

                var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    response.Status = 2;
                    response.Message = "Unauthorized";
                    return Unauthorized(response);
                }

                var result = await _taskService.ToggleTaskStatusAsync(taskId, userId);
                if (!result)
                {
                    response.Status = 2;
                    response.Message = "Task not found";
                    return NotFound(response);
                }

                response.Status = 1;
                response.Data = result;
                return Ok(response);
        }
    }
}
