using System.ComponentModel;
using System.Text.Json.Serialization;

namespace ToDoApp.Models.DTO
{
    public class TaskDTO
    {
        public required string TaskName { get; set; } 
        public required string TaskDescription { get; set; } 
        public DateTime? CreatedDate { get; set; }  = DateTime.Now;
        public DateTime? ModifiedDate { get; set; }
        [JsonPropertyName("IsCompleted")]
        [DefaultValue(false)]
        public bool IsCompleted { get; set; }
        [JsonPropertyName("IsDeleted")]
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
        public int? TaskId { get; set; } 
        public int? UserId { get; set; } 

    }
}
