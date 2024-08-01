using api.Dto;
using api.Entities;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly DataContext _context;
		private readonly JwtTokenService _jwtTokenService;
		private readonly IMapper _mapper;

		public AuthController(DataContext context, JwtTokenService jwtTokenService, IMapper mapper )
		{
			_context = context;
			_mapper = mapper;
			_jwtTokenService = jwtTokenService;
		}

		[HttpPost("register")]
		public async Task<ActionResult<UserDto>> Register( UserDto userDto )
		{
			if (await _context.Users.AnyAsync(u => u.Email == userDto.Email || u.UName == userDto.UName))
			{
				return BadRequest("User with this email or username already exists.");
			}

			var user = _mapper.Map<User>(userDto);
			user.Pass = HashPassword(userDto.Pass);

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

            var token = _jwtTokenService.GenerateToken(user);

            var userResultDto = new
            {
                Token = token,
                User = new
                {
                    UserID = user.UserID,
                    FName = user.FName,
                    LName = user.LName,
                    Email = user.Email,
                    UName = user.UName,
                    Type = user.Type
                }
            };

            return CreatedAtAction(nameof(Register), new { id = user.UserID }, userResultDto);
        }

		[HttpPost("login")]
		public async Task<ActionResult> Login(LoginDto loginDto)
		{
			var user = await _context.Users.SingleOrDefaultAsync(u => u.UName == loginDto.UName);

			if(user == null || !VerifyPassword(loginDto.Pass, user.Pass))
			{
				return Unauthorized("Invalid username or password.");
			}

			var token = _jwtTokenService.GenerateToken(user);
			return Ok(new { 
				Token = token,
				User = new
				{
					UserID = user.UserID,
					FName = user.FName,
					LName = user.LName,
					Email = user.Email,
					UName = user.UName,
					Type = user.Type
				}
			});
		}

		private string HashPassword( string password )
		{
			byte[] salt = new byte[128 / 8];
			using (var rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(salt);
			}

			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: password,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA256,
				iterationCount: 10000,
				numBytesRequested: 256 / 8));

			return $"{Convert.ToBase64String(salt)}.{hashed}";
		}

		private bool VerifyPassword( string enteredPassword, string storedPassword )
		{
			var parts = storedPassword.Split('.');
			if (parts.Length != 2)
			{
				return false;
			}

			var salt = Convert.FromBase64String(parts[0]);
			var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: enteredPassword,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA256,
				iterationCount: 10000,
				numBytesRequested: 256 / 8));

			return hashed == parts[1];
		}
	}
}
