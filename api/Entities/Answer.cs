using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
	public class Answer
	{

		[Key]
		public int AnswerID { get; set; }

		public int TakeID { get; set; }
		[ForeignKey("TakeID")]
		public TakeQuiz TakeQuiz { get; set; }

		public int OptionID { get; set; }
		[ForeignKey("OptionID")]
		public Option Option { get; set; }

		public Boolean isCorrect { get; set; } = false;
	}
}
