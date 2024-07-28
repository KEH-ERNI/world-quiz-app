using System.ComponentModel.DataAnnotations;

namespace api.Dto
{
	public class LoginDto
	{
		[Required]
		public string UName { get; set; } = string.Empty;

		[Required]
		public string Pass { get; set; } = string.Empty;
	}
}
