using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class HandymanDbContext:IdentityDbContext<ApplicationUser,ApplicationRole,Guid>
{
    public HandymanDbContext(DbContextOptions<HandymanDbContext>options):base(options)
    {
        
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
    
}