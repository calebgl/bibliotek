using Bibliotek.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder
    .Services.AddIdentityApiEndpoints<User>(options =>
    {
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<BibliotekContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Events = new Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents
    {
        OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.FromResult(0);
        },
        OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.FromResult(0);
        },
    };
});

builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultScheme = IdentityConstants.ApplicationScheme;
        options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
    })
    .AddGitHub(options =>
    {
        IConfigurationSection githubAuthNSection = builder.Configuration.GetSection(
            "Authentication:GitHub"
        );

        options.ClientId =
            githubAuthNSection["ClientId"]
            ?? throw new InvalidOperationException(
                "Authentication GitHub string 'ClientId' not found."
            );
        options.ClientSecret =
            githubAuthNSection["ClientSecret"]
            ?? throw new InvalidOperationException(
                "Authentication GitHub string 'ClientSecret' not found."
            );
        options.Scope.Add("user:email");
        options.SaveTokens = true;
    });

builder.Services.AddDbContext<BibliotekContext>(options =>
{
    options.UseSqlite(
        builder.Configuration.GetConnectionString("SQLite")
            ?? throw new InvalidOperationException("Connection string 'SQLite' not found.")
    );

    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging().EnableDetailedErrors();
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
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(config =>
{
    config.AllowAnyOrigin();
    config.AllowAnyMethod();
    config.AllowAnyHeader();
});

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
