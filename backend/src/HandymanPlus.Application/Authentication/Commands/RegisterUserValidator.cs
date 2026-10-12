using FluentValidation;

public class RegisterUserValidator:AbstractValidator<RegisterUserCommand>
{
    public RegisterUserValidator()
    {
        RuleFor(user=>user.Login)
        .NotEmpty();
        RuleFor(user=>user.Password)
        .MinimumLength(6)
        .NotEmpty()
        .Matches(@"^.*[A-Z].*$")
        .Matches(@"^.*[0-9].*$")
        .Matches(@"^.*\W.*$");
    }
}