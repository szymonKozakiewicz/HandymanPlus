public interface IUserManagerProxy
{
    public Task<OperationResult> AddNewUserAsync(RegisterUserCommand newUserCommand);
    public  Task<bool> UserByLoginExistsAsync(String login);
}