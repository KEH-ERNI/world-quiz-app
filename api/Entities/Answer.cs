using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
	public class Answer
	{
		[Key]
		public int AnswerID { get; set; }

        [ForeignKey("TakeID")]
        public int TakeID { get; set; }
		
		public TakeQuiz TakeQuiz { get; set; }

        [ForeignKey("OptionID")]
        public int OptionID { get; set; }
		public Option Option { get; set; }

		public Boolean isCorrect { get; set; } = false;
	}
}
