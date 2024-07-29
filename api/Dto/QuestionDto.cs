using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dto
{
    public class QuestionDto
    {
        [Key]
        public int QuestionID { get; set; }

        public int QuizID { get; set; }

        [MaxLength(255)]
        public string Text { get; set; } = string.Empty;

        public ICollection<OptionDto>? Options { get; set; }
    }
}
