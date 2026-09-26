using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class UserManagerProxy:IUserManagerProxy
{
    private UserManager<ApplicationUser>_userManager;


    public UserManagerProxy(UserManager<ApplicationUser>userManager)
    {
        this._userManager=userManager;  
    }

    public async Task<OperationResult> AddNewUserAsync(RegisterUserCommand registerUserCommand)
    {
        var newUser=new ApplicationUser(registerUserCommand);
        var operationResult=await this._userManager.CreateAsync(newUser,registerUserCommand.Password);
        return operationResult.Succeeded?OperationResult.SUCCESS:OperationResult.FAILURE;

    }

    public async Task<bool> UserByLoginExistsAsync(String login)
    {
        var result=await this._userManager.Users.AnyAsync(a=>a.UserName==login);
        return result;
    }
    
}