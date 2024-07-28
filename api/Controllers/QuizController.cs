using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class QuizController : ControllerBase
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		private readonly IWebHostEnvironment _webHostEnvironment;

		public QuizController(DataContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment )
		{
			_context = context;
			_mapper = mapper;
			_webHostEnvironment = webHostEnvironment;
		}

		[HttpGet]
		public IActionResult Get() { }

		/*using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Threading.Tasks;
using YourNamespace.Models;
using YourNamespace.Services;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public QuizController(DataContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
    {
        _context = context;
        _mapper = mapper;
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuizDto>>> GetQuizzes()
    {
        var quizzes = await _context.Quizzes.ToListAsync();
        return Ok(_mapper.Map<IEnumerable<QuizDto>>(quizzes));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<QuizDto>> GetQuiz(int id)
    {
        var quiz = await _context.Quizzes.FindAsync(id);

        if (quiz == null)
        {
            return NotFound();
        }

        return Ok(_mapper.Map<QuizDto>(quiz));
    }

    [HttpPost]
    public async Task<ActionResult<QuizDto>> CreateQuiz([FromForm] QuizDto quizDto)
    {
        var quiz = _mapper.Map<Quiz>(quizDto);

        if (quizDto.ImageFile != null)
        {
            var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", quizDto.ImageFile.FileName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await quizDto.ImageFile.CopyToAsync(stream);
            }
            quiz.ImageName = quizDto.ImageFile.FileName;
        }

        _context.Quizzes.Add(quiz);
        await _context.SaveChangesAsync();

        var createdQuiz = _mapper.Map<QuizDto>(quiz);
        return CreatedAtAction(nameof(GetQuiz), new { id = quiz.QuizID }, createdQuiz);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuiz(int id, [FromForm] QuizDto quizDto)
    {
        if (id != quizDto.QuizID)
        {
            return BadRequest();
        }

        var quiz = await _context.Quizzes.FindAsync(id);

        if (quiz == null)
        {
            return NotFound();
        }

        if (quizDto.ImageFile != null)
        {
            var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", quizDto.ImageFile.FileName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await quizDto.ImageFile.CopyToAsync(stream);
            }
            quiz.ImageName = quizDto.ImageFile.FileName;
        }

        _mapper.Map(quizDto, quiz);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!QuizExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuiz(int id)
    {
        var quiz = await _context.Quizzes.FindAsync(id);
        if (quiz == null)
        {
            return NotFound();
        }

        _context.Quizzes.Remove(quiz);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool QuizExists(int id)
    {
        return _context.Quizzes.Any(e => e.QuizID == id);
    }
}

		 */
	}
}
