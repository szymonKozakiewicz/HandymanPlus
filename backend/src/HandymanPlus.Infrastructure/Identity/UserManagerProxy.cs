using Microsoft.AspNetCore.Identity;

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
    
}