using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base (options) { }

		public DbSet<User> Users { get; set; }

		public DbSet<Quiz> Quizzes { get; set; }

		public DbSet<Question> Questions { get; set; }

		public DbSet<Option> Options { get; set; }

		public DbSet<TakeQuiz> TakeQuizzes { get; set; }

		public DbSet<Answer> Answers { get; set; }
	}
}
