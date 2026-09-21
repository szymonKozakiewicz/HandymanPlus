using MediatR;

public sealed record RegisterUserCommand(
    string Login,
    string Password,
    bool IsHandyman,
    string HandymanType
    
):IRequest<OperationResult>;


internal sealed class RegisterUserHandler(IUserManagerProxy userManagerProxy): IRequestHandler<RegisterUserCommand, OperationResult>
{
    public async Task<OperationResult> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var result=await userManagerProxy.AddNewUserAsync(request);
        return result;
    }
}