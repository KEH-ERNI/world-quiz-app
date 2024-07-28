using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
	public class User
	{
		[Key]
		public int UserID { get; set; }

		[Required, MaxLength(50)]
		public string FName { get; set; } = string.Empty;

		[Required, MaxLength(50)]
		public string LName { get; set; } = string.Empty;

		[Required, EmailAddress, MaxLength(50)]
		public string Email { get; set; } = string.Empty;

		[Required, MaxLength(50)]
		public string UName { get; set; } = string.Empty;

		[Required]
		public string Pass { get; set; } = string.Empty;

		[Required, MaxLength(50)]
		public string Type { get; set; } = "Instructor";

		public ICollection<Quiz> Quizzes { get; set; }
	}
}
