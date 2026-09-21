using Microsoft.EntityFrameworkCore;
using HandymanPlus.Api.Features.Authentication.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<HandymanDbContext>(
    options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    }

);
builder.Services.AddIdentity<ApplicationUser,ApplicationRole>(
    options =>
    {
        options.Password.RequiredLength=8;
        
    }
).AddEntityFrameworkStores<HandymanDbContext>();
builder.Services.AddMediatR(
    conf =>
    {
      conf.RegisterServicesFromAssemblies(
        typeof(Program).Assembly,
        typeof(RegisterUserCommand).Assembly);
    }
);

builder.Services.AddScoped<IUserManagerProxy,UserManagerProxy>();

var app = builder.Build();


app.UseHttpsRedirection();
app.MapControllers();
app.MapRegisterEndpoints();


app.Run();

