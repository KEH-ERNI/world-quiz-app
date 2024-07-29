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

			CreateMap<Quiz, QuizDto>()
				.ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User.UserID))
				.ReverseMap()
				.ForMember(dest => dest.QuizID, opt => opt.Ignore())
				.ForMember(dest => dest.User, opt => opt.Ignore())
				.ForMember(dest => dest.UserID, opt => opt.Ignore());

			CreateMap<Question, QuestionDto>()
				.ForMember(dest => dest.QuizID, opt => opt.MapFrom(src =>  src.Quiz.QuizID))
				.ReverseMap()
                .ForMember(dest => dest.QuestionID, opt => opt.Ignore())
                .ForMember(dest => dest.Quiz, opt => opt.Ignore())
				.ForMember(dest => dest.QuizID, opt => opt.Ignore());

			CreateMap<TakeQuiz, TakeQuizDto>()
				.ForMember(dest => dest.QuizID, opt => opt.MapFrom(src => src.Quiz.QuizID))
				.ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.User.UserID))
				.ReverseMap()
                .ForMember(dest => dest.TakeID, opt => opt.Ignore())
                .ForMember(dest => dest.Quiz, opt => opt.Ignore())
				.ForMember(dest => dest.QuizID, opt => opt.Ignore())
				.ForMember(dest => dest.User, opt => opt.Ignore())
				.ForMember(dest => dest.UserID, opt => opt.Ignore());

			CreateMap<Option, OptionDto>()
				.ForMember(dest => dest.QuestionID, opt => opt.MapFrom(src => src.Question.QuestionID))
				.ReverseMap()
				.ForMember(dest => dest.OptionID, opt => opt.Ignore())
				.ForMember(dest => dest.Question, opt => opt.Ignore())
				.ForMember(dest => dest.QuestionID, opt => opt.Ignore());

			CreateMap<Answer, AnswerDto>()
				.ForMember(dest => dest.OptionID, opt => opt.MapFrom(src => src.Option.OptionID))
				.ForMember(dest => dest.TakeID, opt => opt.MapFrom(src => src.TakeQuiz.TakeID))
				.ReverseMap()
				.ForMember(dest => dest.AnswerID, opt => opt.Ignore())
				.ForMember(dest => dest.Option, opt => opt.Ignore())
				.ForMember(dest => dest.OptionID, opt => opt.Ignore())
				.ForMember(dest => dest.TakeID, opt => opt.Ignore())
				.ForMember(dest => dest.TakeQuiz, opt => opt.Ignore());
		}
	}
}
