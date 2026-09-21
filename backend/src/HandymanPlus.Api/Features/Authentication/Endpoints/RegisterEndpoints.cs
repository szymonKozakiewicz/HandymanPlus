using MediatR;

namespace HandymanPlus.Api.Features.Authentication.Endpoints;

public static class RegisterEndpoints
{
    public static IEndpointRouteBuilder MapRegisterEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapPost("/api/registerUser",RegisterUser);
        return builder;
        
    }

    private static async Task<IResult> RegisterUser(ISender sender,RegisterUserCommand registerUserCommand)
    {
        OperationResult result=await sender.Send(registerUserCommand);
        return result==OperationResult.SUCCESS?Results.Ok():Results.BadRequest();
        
        
    }

}