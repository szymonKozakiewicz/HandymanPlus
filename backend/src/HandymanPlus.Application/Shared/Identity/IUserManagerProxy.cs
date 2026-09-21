public interface IUserManagerProxy
{
    public Task<OperationResult> AddNewUserAsync(RegisterUserCommand newUserCommand);
}