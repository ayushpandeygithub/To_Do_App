using System;
using System.Collections.Generic;

namespace ToDoApp.DAL.Entities;

public partial class User
{
    public string? Username { get; set; }

    public string? PasswordHash { get; set; }

    public bool? IsActive { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
