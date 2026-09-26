using MediatR;

namespace HandymanPlus.Api.Features.Authentication.Endpoints;

public static class RegisterEndpoints
{
    public static IEndpointRouteBuilder MapRegisterEndpoints(this IEndpointRouteBuilder builder)
    {
        var group=builder.MapGroup("/api/register");
        group.MapPost("/registerUser",RegisterUser);
        group.MapGet("/loginCheck",IsLoginAvailable);
        return builder;
        
    }

    private static async Task<IResult> RegisterUser(ISender sender,RegisterUserCommand registerUserCommand)
    {
        OperationResult result=await sender.Send(registerUserCommand);
        return result==OperationResult.SUCCESS?Results.Ok():Results.BadRequest();
        
        
    }

    private static async Task<IResult> IsLoginAvailable(ISender sender,string login)
    {
        var query=new IsLoginAvailableQuery(login);
        var result=await sender.Send(query);
        return Results.Ok(result);
    }

}