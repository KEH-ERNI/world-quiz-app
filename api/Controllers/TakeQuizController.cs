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
    public class TakeQuizController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TakeQuizController(DataContext context, IMapper mapper)
        {
            _context=context;
            _mapper=mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<TakeQuizDto>>> GetAllTakeQuizzes()
        {
            var tquizzes = await _context.TakeQuizzes
                .Include(d => d.Quiz)
                .Include(d => d.User)
                .ToListAsync();

            var tquizzesDtos = _mapper.Map<List<TakeQuizDto>>(tquizzes);
            return Ok(tquizzesDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TakeQuizDto>> GetTakeQuiz(int id)
        {
            var tquizzes = await _context.TakeQuizzes
                .Include(d => d.Quiz)
                .Include(d => d.User)
                .FirstOrDefaultAsync(d => d.TakeID == id);

            if (tquizzes == null)
            {
                return NotFound("Take quiz not found");
            }

            var tquizzesDtos = _mapper.Map<TakeQuizDto>(tquizzes);
            return Ok(tquizzesDtos);
        }

        [HttpPost]
        public async Task<ActionResult<TakeQuizDto>> AddTakeQuiz(TakeQuizDto takeQuizDto)
        {
            var tquizzes = _mapper.Map<TakeQuiz>(takeQuizDto);

            var user = await _context.Users.FindAsync(takeQuizDto.UserID);
            var quiz = await _context.Quizzes.FindAsync(takeQuizDto.QuizID);
            if (user == null || quiz == null) {
                return NotFound("User or Quiz doesn't exist");
            }

            tquizzes.Quiz = quiz;
            tquizzes.User = user;

            _context.TakeQuizzes.Add(tquizzes);
            await _context.SaveChangesAsync();

            var tquizzesResultDto = _mapper.Map<TakeQuizDto>(tquizzes);
            return CreatedAtAction(nameof(GetTakeQuiz), new {id = tquizzes.TakeID}, tquizzesResultDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTakeQuiz(int id, TakeQuizDto takeQuizDto)
        {
            var tquizzes = await _context.TakeQuizzes
               .Include(d => d.Quiz)
               .Include(d => d.User)
               .FirstOrDefaultAsync(d => d.TakeID == id);

            if (tquizzes == null)
            {
                return NotFound("Take quiz not found");
            }

            _mapper.Map(takeQuizDto, tquizzes);
            _context.Entry(tquizzes.User).State = EntityState.Unchanged;
            _context.Entry(tquizzes.Quiz).State = EntityState.Unchanged;

            await _context.SaveChangesAsync();

            var tquizzesDto = _mapper.Map<TakeQuizDto>(tquizzes);
            return Ok(tquizzesDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<TakeQuizDto>>> DeleteTakeQuiz(int id)
        {
            var tquizzes = await _context.TakeQuizzes
               .Include(d => d.Quiz)
                .Include(d => d.User)
               .FirstOrDefaultAsync(d => d.TakeID == id);

            if (tquizzes == null)
            {
                return NotFound("Take quiz not found");
            }

            _context.TakeQuizzes.Remove(tquizzes);
            await _context.SaveChangesAsync();

            var remainingTquizzes = await _context.TakeQuizzes
                .Include(d => d.Quiz)
                .Include(d => d.User)
                .ToListAsync();

            var tquizzesResultDto = _mapper.Map<List<TakeQuizDto>>(remainingTquizzes);
            return Ok(tquizzesResultDto);
        } 
    }
}
