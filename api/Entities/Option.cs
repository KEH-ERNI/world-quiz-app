using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
	public class Option
	{
		[Key]
		public int OptionID { get; set; }

		public int QuestionID { get; set; }
		[ForeignKey("QuestionID")]
		public Question Question { get; set; }

		[Required, MaxLength(255)]
		public string Text { get; set; } = string.Empty;

		[Required]
		public Boolean isCorrect { get; set; } = false;

		public ICollection<Answer> Answers { get; set; }
	}
}
