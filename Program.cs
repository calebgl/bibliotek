using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

if (builder.Environment.IsDevelopment())
{
    builder.Logging.ClearProviders();
    builder.Logging.AddConsole();

    builder.Services.AddDbContext<BibliotekContext>(options =>
    {
        options.UseSqlite(builder.Configuration.GetConnectionString("SQLite"));
        options.EnableSensitiveDataLogging();
    });
}
else
{
    builder.Services.AddDbContext<BibliotekContext>(options =>
        options.UseSqlite(
            builder.Configuration.GetConnectionString("SQLite")
                ?? throw new InvalidOperationException("Connection string 'SQLite' not found.")
        )
    );
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHsts();
    app.UseExceptionHandler("/error");
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<BibliotekContext>();
    context.Database.OpenConnection();
    context.Database.Migrate();

    DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
