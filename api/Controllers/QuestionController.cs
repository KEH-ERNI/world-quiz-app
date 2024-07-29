using api.Dto;
using api.Entities;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public QuestionController(DataContext context, IMapper mapper)
        {
            _context=context;
            _mapper=mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<QuestionDto>>> GetAllQuestions()
        {
            var questions = await _context.Questions
                .Include(d => d.Quiz)
                .Include(d => d.Options)
                .ToListAsync();

            var questionsDtos = _mapper.Map<List<QuestionDto>>(questions);
            return Ok(questionsDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionDto>> GetQuestions(int id)
        {
            var questions = await _context.Questions
                .Include(d => d.Quiz)
                .Include(d => d.Options)
                .FirstOrDefaultAsync(d => d.QuestionID == id);

            if(questions == null)
            {
                return NotFound("Question not found");
            }

            var questionsDto = _mapper.Map<QuestionDto>(questions);
            return Ok(questionsDto);
        }

        [HttpPost]
        public async Task<ActionResult<QuestionDto>> AddQuestion(QuestionDto questionDto)
        {
            var question = _mapper.Map<Question>(questionDto);

            var quiz = await _context.Quizzes.FindAsync(questionDto.QuizID);

            if(quiz == null)
            {
                return NotFound("This quiz doesn't exist.");
            }

            question.Quiz = quiz;

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            var questionResultDto = _mapper.Map<QuestionDto>(question);
            return CreatedAtAction(nameof(GetQuestions), new { id = question.QuestionID }, questionResultDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateQuestion(int id, QuestionDto questionDto)
        {
            var question = await _context.Questions
                .Include(d => d.Quiz)
                .Include(d => d.Options)
                .FirstOrDefaultAsync(d => d.QuestionID == id);

            if(question == null)
            {
                return NotFound("Question not found.");
            }

            _mapper.Map(questionDto, question);
            _context.Entry(question.Quiz).State = EntityState.Unchanged;

            await _context.SaveChangesAsync();

            var questionResultDto = _mapper.Map<QuestionDto>(question);
            return Ok(questionResultDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<QuestionDto>>> DeleteQuestion(int id)
        {
            var question = await _context.Questions
                .Include(d => d.Quiz)
                .Include(d => d.Options)
                .FirstOrDefaultAsync(d => d.QuestionID == id);

            if (question == null)
            {
                return NotFound("Question does not exist");
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            var remainingQuestions = await _context.Questions
                .Include(d => d.Quiz)
                .Include(d => d.Options)
                .ToListAsync();

            var questionResultDto = _mapper.Map<List<QuestionDto>>(remainingQuestions);
            return Ok(questionResultDto);
        }
    }
}
