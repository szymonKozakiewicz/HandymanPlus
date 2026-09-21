using Microsoft.AspNetCore.Identity;

public class ApplicationUser:IdentityUser<Guid>
{
    public bool IsHandyman{get; set;}=false;
    public string HandymanType {get; set;}="";


    public ApplicationUser()
    {
        
    }

    public ApplicationUser(RegisterUserCommand registerCommand)
    {
        this.UserName=registerCommand.Login;
        this.IsHandyman=registerCommand.IsHandyman;
        this.HandymanType=registerCommand.HandymanType;

    }
}