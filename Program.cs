using Bibliotek.Models;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var identityBuilder = builder.Services.AddIdentityApiEndpoints<User>(options =>
{
    options.User.RequireUniqueEmail = true;
});
identityBuilder.AddEntityFrameworkStores<BibliotekContext>();

builder.Services.AddDbContext<BibliotekContext>(options =>
{
    options.UseSqlite(
        builder.Configuration.GetConnectionString("SQLite")
            ?? throw new InvalidOperationException("Connection string 'SQLite' not found.")
    );

    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging();
        options.EnableDetailedErrors();
    }
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseDeveloperExceptionPage();
}

app.UseExceptionHandler("/error");
app.UseHsts();
app.UseHttpsRedirection();
app.UseAuthorization();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<BibliotekContext>();
    context.Database.OpenConnection();
    context.Database.Migrate();

    DbInitializer.Initialize(context);
}

app.MapIdentityApi<User>();
app.MapControllers();

app.Run();
