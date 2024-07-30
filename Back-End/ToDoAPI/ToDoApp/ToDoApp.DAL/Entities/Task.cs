
namespace ToDoApp.DAL.Entities;

public partial class Task
{
    public string TaskName { get; set; } = null!;

    public string TaskDescription { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public bool? IsCompleted { get; set; }

    public bool? IsDeleted { get; set; }

    public int TaskId { get; set; }

    public int? UserId { get; set; }

    public virtual User? User { get; set; }
}
