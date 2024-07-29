using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dto
{
    public class AnswerDto
    {
        [Key]
        public int AnswerID { get; set; }
        public int TakeID { get; set; }

        public int OptionID { get; set; }
        public Boolean isCorrect { get; set; } = false;
    }
}
