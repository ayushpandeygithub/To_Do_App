using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ToDoApp.BAL.Contracts;
using ToDoApp.DAL.Contracts;
using ToDoApp.DAL.Entities;
using ToDoApp.Models.DTO;
using Nelibur.ObjectMapper;
using ToDoApp.DAL.UnitOfWork;

namespace ToDoApp.BAL.Implementations
{
    public class UserServices : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly UnitOfWork _unitOfWork;
        public UserServices(IUserRepository userRepository, IConfiguration configuration , UnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _unitOfWork = unitOfWork;
            InitializeMapping();
        }

        private void InitializeMapping()
        {
            TinyMapper.Bind<UserDTO, User>(config => {
                config.Ignore(usr=>usr.Password);
                config.Bind( usr => usr.UserName,usr => usr.Username);
            });
            TinyMapper.Bind<User, UserDTO>(config => {
                config.Bind(usr => usr.Username, usr => usr.UserName);
            });
        }

        public string GenerateJwtToken(UserDTO user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                                             _configuration["Jwt:Issuer"],
                                             claims,
                                             expires: DateTime.Now.AddMinutes(120),
                                             signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> UserExistsAsync(string username)
        {
            return await _userRepository.UserExistsAsync(username);
        }

        public async Task<UserDTO> CreateUserAsync(UserDTO userDto)
        {
            var user = TinyMapper.Map<User>(userDto);
            if (user == null)
            {
                throw new ArgumentNullException(nameof(userDto), "UserDTO cannot be null.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            user.IsActive = true;

            var createdUser = await _userRepository.CreateUserAsync(user);
            await _unitOfWork.Save();
            return TinyMapper.Map<UserDTO>(createdUser);
        }

        public async Task<UserDTO> GetUserAsync(string username)
        {
            var user = await _userRepository.GetUserAsync(username);
            if (user == null)
            {
                return null;
            }

            return TinyMapper.Map<UserDTO>(user);
        }
    }
}
