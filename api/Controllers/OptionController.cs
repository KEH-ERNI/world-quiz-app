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
    public class OptionController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;


        public OptionController(DataContext context, IMapper mapper)
        {
            _context=context;
            _mapper=mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<OptionDto>>> GetAllOptions()
        {
            var options = await _context.Options
                .Include(d => d.Question)
                .Include(d => d.Answers)
                .ToListAsync();

            var optionsDto = _mapper.Map<List<OptionDto>>(options);
            return Ok(optionsDto);

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OptionDto>> GetOptions(int id)
        {
            var options = await _context.Options
                .Include(d => d.Question)
                .Include(d => d.Answers)
                .FirstOrDefaultAsync(d => d.OptionID == id);

            if(options == null)
            {
                return NotFound("Option not found.");
            }

            var optionsDto = _mapper.Map<OptionDto>(options);
            return Ok(optionsDto);
        }

        [HttpPost]
        public async Task<ActionResult<OptionDto>> AddOptions(OptionDto optionDto)
        {
            var option = _mapper.Map<Option>(optionDto);

            var question = await _context.Questions.FindAsync(optionDto.QuestionID);

            if (question == null)
            {
                return NotFound("This question doesn't exist.");
            }

            option.Question = question;

            _context.Options.Add(option);
            await _context.SaveChangesAsync();

            var optionResultDto = _mapper.Map<OptionDto>(option);
            return CreatedAtAction(nameof(GetOptions), new { id = option.OptionID }, optionResultDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOption(int id, OptionDto optionDto)
        {
            var option = await _context.Options
                .Include(d => d.Question)
                .Include(d => d.Answers)
                .FirstOrDefaultAsync(d => d.OptionID == id);

            if(option == null)
            {
                return NotFound("Option not found");
            }

            _mapper.Map(optionDto, option);
            _context.Entry(option.Question).State = EntityState.Unchanged;

            await _context.SaveChangesAsync();

            var optionResultDto = _mapper.Map<OptionDto>(option);
            return Ok(optionResultDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<OptionDto>>> DeleteOption(int id)
        {
            var option = await _context.Options
                .Include(d => d.Question)
                .Include(d => d.Answers)
                .FirstOrDefaultAsync(d => d.OptionID == id);

            if (option == null)
            {
                return NotFound("Option not found");
            }

            _context.Options.Remove(option);
            await _context.SaveChangesAsync();

            var remainingOptions = await _context.Options
                .Include(d => d.Question)
                .Include(d => d.Answers)
                .ToListAsync();

            return Ok(remainingOptions);
        }

    }
}
