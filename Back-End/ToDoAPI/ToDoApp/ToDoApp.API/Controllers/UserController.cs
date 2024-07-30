using Microsoft.AspNetCore.Mvc;
using ToDoApp.BAL.Contracts;
using ToDoApp.Models.DTO;
using ToDoApp.Models.Response;

namespace ToDoApp.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class UserController : Controller
    {   
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO registerRequest)
        {
            var response = new ApiResponse<string>();
                if (await _userService.UserExistsAsync(registerRequest.UserName))
                {
                    response.Status = 2;
                    response.Message = "Username already exists.";
                    return BadRequest(response);
                }

                var user = await _userService.CreateUserAsync(registerRequest);
                var token = _userService.GenerateJwtToken(user);

                response.Status = 1;
                response.Data = token;
                return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDTO loginRequest)
        {
            var response = new ApiResponse<string>();

                var user = await _userService.GetUserAsync(loginRequest.UserName);
                if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
                {
                    response.Status = 2;
                    response.Message = "Invalid username or password.";
                    return Unauthorized(response);
                }

                var token = _userService.GenerateJwtToken(user);
                response.Status = 1;
                response.Data = token;
                return Ok(response);
        }
    }
}
