using api.Dto;
using api.Entities;
using AutoMapper;

namespace api.Mapping
{
	public class MappingProfile : Profile
	{
		public MappingProfile() {
			CreateMap<User, UserDto>().ReverseMap();

			CreateMap<UserDto, User>()
			.ForMember(dest => dest.UserID, opt => opt.Ignore());
		}
	}
}
