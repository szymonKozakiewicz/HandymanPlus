using MediatR;

public sealed record IsLoginAvailableQuery(
    string loginName):IRequest<LoginCheckResponse>;

public class IsLoginAvailableHandler : IRequestHandler<IsLoginAvailableQuery, LoginCheckResponse>
{
    private IUserManagerProxy _userManager;
    public IsLoginAvailableHandler(IUserManagerProxy userManagerProxy)
    {
        _userManager=userManagerProxy;
    }
    public async Task<LoginCheckResponse> Handle(IsLoginAvailableQuery request, CancellationToken cancellationToken)
    {
        bool isLoginAvaiable=!(await this._userManager.UserByLoginExistsAsync(request.loginName));
        var result=new LoginCheckResponse(isLoginAvaiable);
        return result;
    }
}

