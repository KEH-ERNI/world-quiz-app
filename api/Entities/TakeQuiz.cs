using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
	public class TakeQuiz
	{
		[Key]
		public int TakeID { get; set; }

		public int QuizID { get; set; }
		[ForeignKey("QuizID")]
		public Quiz Quiz { get; set; }

		public DateTime Date { get; set; } = DateTime.Now;

		public int Score { get; set; } = 0;

		public int UserID { get; set; }
		[ForeignKey("TakerID")]
		public User User { get; set; }

		public ICollection<Answer> Answers { get; set; }
	}
}
