using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ToDoApp.BAL.Contracts;
using ToDoApp.BAL.Implementations;
using ToDoApp.DAL.Contracts;
using ToDoApp.DAL.Entities;
using ToDoApp.DAL.Implementations;
using Microsoft.OpenApi.Models;
using ToDoApp.API.GlobalExceptionHandler;
using Serilog;
using ToDoApp.DAL.UnitOfWork;

namespace ToDoApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Use Serilog for logging
            Log.Logger = new LoggerConfiguration()
                        .WriteTo.File("logs/exceptions.txt", rollingInterval: RollingInterval.Day, outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level}] {Message}{NewLine}{Exception}", restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Error).CreateLogger();
            builder.Host.UseSerilog(); 
            // Inject IConfiguration
            var configuration = builder.Configuration;
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Dependencies
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ITaskRepository, TaskRepository>();
            builder.Services.AddScoped<IUserService, UserServices>();
            builder.Services.AddScoped<ITaskService, TaskServices>();
            builder.Services.AddScoped<ToDoAppContext>();
            builder.Services.AddScoped<ExceptionHandler>();
            builder.Services.AddScoped<UnitOfWork>();
            // Add authentication with JWT
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
                    };
                });
            //For Authentication in swagger
            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                   {
                      new OpenApiSecurityScheme
                      {
                        Reference = new OpenApiReference
                         {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                         }
                      },
                      new string[]{}
                   }
                 });
                });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
           .AllowAnyHeader());
            app.UseExceptionHandler(_=> { });
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
