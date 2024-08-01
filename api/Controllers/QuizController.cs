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
    public class QuizController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _environment;

        public QuizController(DataContext context, IMapper mapper, IWebHostEnvironment environment)
        {
            _context = context;
            _mapper = mapper;
            _environment = environment;
        }

        [HttpGet]
        public async Task<ActionResult<List<QuizDto>>> GetAllQuizzes()
        {
            var quizzes = await _context.Quizzes
                .Include(d => d.User)
                .Include(d => d.Questions)
                .Include(d => d.TakeQuizzes)
                .ToListAsync();
            var quizzesDtos = _mapper.Map<List<QuizDto>>(quizzes);

            return Ok(quizzesDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuizDto>> GetQuiz(int id)
        {
            var quiz = await _context.Quizzes
                .Include(d => d.User)
                .Include(d => d.Questions)
                .Include(d => d.TakeQuizzes)
                .FirstOrDefaultAsync(d => d.QuizID == id);

            if (quiz == null)
            {
                return NotFound("Quiz not found.");
            }

            var quizzesDto = _mapper.Map<QuizDto>(quiz);
            return Ok(quizzesDto);
        }

        [HttpPost]
        public async Task<ActionResult<QuizDto>> AddQuiz([FromForm] QuizDto quizDto)
        {
            var quiz = _mapper.Map<Quiz>(quizDto);

            var user = await _context.Users.FindAsync(quizDto.UserID);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (quizDto.ImageFile == null || quizDto.ImageFile.Length == 0)
            {
                return BadRequest("Image file is required");
            }

            string newFileName = DateTime.Now.ToString("yyyyMMddHHmmssff") + Path.GetExtension(quizDto.ImageFile.FileName);
            string imgFullPath = Path.Combine(_environment.WebRootPath, "images", newFileName);

            if (!Directory.Exists(Path.Combine(_environment.WebRootPath, "images")))
            {
                Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "images"));
            }

            using (var stream = new FileStream(imgFullPath, FileMode.Create))
            {
                await quizDto.ImageFile.CopyToAsync(stream);
            }

            quiz.ImageName = newFileName;
            quiz.User = user;
            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();

            var quizResultDto = _mapper.Map<QuizDto>(quiz);
            return CreatedAtAction(nameof(GetQuiz), new { id = quiz.QuizID }, quizResultDto);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateQuiz(int id, [FromForm] QuizDto quizDto)
        {
            var quiz = await _context.Quizzes
                .Include(d => d.User)
                .Include(d => d.Questions)
                .Include(d => d.TakeQuizzes)
                .FirstOrDefaultAsync(d => d.QuizID == id);

            if (quiz == null)
            {
                return NotFound("Quiz does not exist.");
            }

            if (quizDto.ImageFile != null && quizDto.ImageFile.Length > 0)
            {
                if (!string.IsNullOrEmpty(quiz.ImageName))
                {
                    string oldImgPath = Path.Combine(_environment.WebRootPath, "images", quiz.ImageName);
                    if (System.IO.File.Exists(oldImgPath))
                    {
                        System.IO.File.Delete(oldImgPath);
                    }
                }

                string newFileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + Path.GetExtension(quizDto.ImageFile.FileName);

                string imgFullPath = Path.Combine(_environment.WebRootPath, "images", newFileName);

                if (!Directory.Exists(Path.Combine(_environment.WebRootPath, "images")))
                {
                    Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "images"));
                }

                using (var stream = new FileStream(imgFullPath, FileMode.Create))
                {
                    await quizDto.ImageFile.CopyToAsync(stream);
                }

                quizDto.ImageName = newFileName;
            }

            _mapper.Map(quizDto, quiz);
            await _context.SaveChangesAsync();

            var quizResultDto = _mapper.Map<QuizDto>(quiz);
            return Ok(quizResultDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<QuizDto>>> DeleteQuiz(int id)
        {
            var quiz = await _context.Quizzes
                .Include(d => d.User)
                .Include(d => d.Questions)
                .Include(d => d.TakeQuizzes)
                .FirstOrDefaultAsync(d => d.QuizID == id);

            if (quiz == null)
            {
                return NotFound("Quiz does not exist.");

            }

            if (!string.IsNullOrEmpty(quiz.ImageName))
            {
                string oldImgPath = Path.Combine(_environment.WebRootPath, "images", quiz.ImageName);
                if (System.IO.File.Exists(oldImgPath))
                {
                    System.IO.File.Delete(oldImgPath);
                }
            }

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();

            var remainingQuizzes = await _context.Quizzes
                .Include(d => d.User)
                .Include(d => d.Questions)
                .Include(d => d.TakeQuizzes)
                .ToListAsync();

            var quizResultDto = _mapper.Map<List<QuizDto>>(remainingQuizzes);
            return Ok(quizResultDto);
        }
    
	}
}
