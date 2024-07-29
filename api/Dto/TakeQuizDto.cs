using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dto
{
    public class TakeQuizDto
    {
        [Key]
        public int TakeID { get; set; }

        public int QuizID { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public int Score { get; set; } = 0;

        public int UserID { get; set; }

        public ICollection<AnswerDto>? Answers { get; set; }
    }
}
