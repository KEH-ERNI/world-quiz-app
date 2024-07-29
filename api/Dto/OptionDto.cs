using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dto
{
    public class OptionDto
    {
        [Key]
        public int OptionID { get; set; }

        public int QuestionID { get; set; }

        [MaxLength(255)]
        public string Text { get; set; } = string.Empty;

        public Boolean isCorrect { get; set; } = false;

        public ICollection<AnswerDto>? Answers { get; set; }
    }
}
