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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			modelBuilder.Entity<TakeQuiz>()
				.HasOne(a => a.User)
				.WithMany(c => c.TakeQuizzes)
				.HasForeignKey(a => a.UserID);

			modelBuilder.Entity<TakeQuiz>()
				.HasOne(a => a.Quiz)
				.WithMany(c => c.TakeQuizzes)
				.HasForeignKey(a => a.QuizID);

            modelBuilder.Entity<Quiz>()
                .HasOne(a => a.User)
                .WithMany(c => c.Quizzes)
                .HasForeignKey(a => a.UserID);

            modelBuilder.Entity<Question>()
                .HasOne(a => a.Quiz)
                .WithMany(c => c.Questions)
                .HasForeignKey(a => a.QuizID);

            modelBuilder.Entity<Option>()
                .HasOne(a => a.Question)
                .WithMany(c => c.Options)
                .HasForeignKey(a => a.QuestionID);

            modelBuilder.Entity<Answer>()
                .HasOne(a => a.Option)
                .WithMany(c => c.Answers)
                .HasForeignKey(a => a.OptionID);

            modelBuilder.Entity<Answer>()
                .HasOne(a => a.TakeQuiz)
                .WithMany(c => c.Answers)
                .HasForeignKey(a => a.TakeID);
        }
    }
}
