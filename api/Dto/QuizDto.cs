using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dto
{
	public class QuizDto
	{
		[Key]
		public int QuizID { get; set; }

		public int UserID { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(50)]
		public string Category { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Type { get; set; } = "Multiple Choice";

        [MaxLength(50)]
		public string Difficulty { get; set; } = "Easy";

		public int Quantity { get; set; } = 10;

		[MaxLength(255)]
		public string Description { get; set; } = string.Empty;

		public IFormFile ImageFile { get; set; }

        [MaxLength(255)]
        public string ImageName { get; set; } = string.Empty;

        public int Code { get; set; }

		public ICollection<QuestionDto>? Questions { get; set; }

		public ICollection<TakeQuizDto>? TakeQuizzes { get; set; }
	}
}
