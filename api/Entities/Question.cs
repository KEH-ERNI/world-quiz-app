using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
	public class Question
	{
		[Key]
		public int QuestionID { get; set; }

        [ForeignKey("QuizID")]
        public int QuizID { get; set; }
		public Quiz Quiz { get; set; }

		[Required, MaxLength(255)]
		public string Text { get; set; } = string.Empty;

		public ICollection<Option> Options { get; set; }
	}
}
