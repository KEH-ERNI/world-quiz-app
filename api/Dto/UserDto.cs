using api.Entities;
using System.ComponentModel.DataAnnotations;

namespace api.Dto
{
	public class UserDto
	{
		[Key]
		public int UserID { get; set; }

		[MaxLength(50)]
		public string FName { get; set; } = string.Empty;

		[MaxLength(50)]
		public string LName { get; set; } = string.Empty;

		[MaxLength(50)]
		public string Email { get; set; } = string.Empty;

		[MaxLength(50)]
		public string UName { get; set; } = string.Empty;

		public string Pass { get; set; } = string.Empty;

		[MaxLength(50)]
		public string Type { get; set; } = "Instructor";

		public ICollection<Quiz>? Quizzes { get; set; }
	}
}
