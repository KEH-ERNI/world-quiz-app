using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixIDs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_Users_CreatedBy",
                table: "Quizzes");

            migrationBuilder.DropForeignKey(
                name: "FK_TakeQuizzes_Users_TakerID",
                table: "TakeQuizzes");

            migrationBuilder.DropIndex(
                name: "IX_TakeQuizzes_TakerID",
                table: "TakeQuizzes");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_CreatedBy",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "TakerID",
                table: "TakeQuizzes");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Quizzes");

            migrationBuilder.CreateIndex(
                name: "IX_TakeQuizzes_UserID",
                table: "TakeQuizzes",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_UserID",
                table: "Quizzes",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_Users_UserID",
                table: "Quizzes",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TakeQuizzes_Users_UserID",
                table: "TakeQuizzes",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quizzes_Users_UserID",
                table: "Quizzes");

            migrationBuilder.DropForeignKey(
                name: "FK_TakeQuizzes_Users_UserID",
                table: "TakeQuizzes");

            migrationBuilder.DropIndex(
                name: "IX_TakeQuizzes_UserID",
                table: "TakeQuizzes");

            migrationBuilder.DropIndex(
                name: "IX_Quizzes_UserID",
                table: "Quizzes");

            migrationBuilder.AddColumn<int>(
                name: "TakerID",
                table: "TakeQuizzes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Quizzes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TakeQuizzes_TakerID",
                table: "TakeQuizzes",
                column: "TakerID");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_CreatedBy",
                table: "Quizzes",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Quizzes_Users_CreatedBy",
                table: "Quizzes",
                column: "CreatedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TakeQuizzes_Users_TakerID",
                table: "TakeQuizzes",
                column: "TakerID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
