using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
	public class Quiz
	{
		[Key]
		public int QuizID { get; set; }

		public int UserID { get; set; }
		[ForeignKey("CreatedBy")]
		public User User { get; set; }

		[Required, MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[Required, MaxLength(50)]
		public string Category { get; set; } = "Multiple Choice";

		[Required, MaxLength(50)]
		public string Difficulty { get; set; } = "Easy";

		[Required]
		public int Quantity { get; set; } = 10;

		[Required, MaxLength(255)]
		public string Description { get; set; } = string.Empty;

		[Required, MaxLength(255)]
		public string ImageName { get; set; } = string.Empty;

		[Required]
		public int Code { get; set; }

		public ICollection<Question> Questions { get; set; }

		public ICollection<TakeQuiz> TakeQuizzes { get; set; }
	}
}
