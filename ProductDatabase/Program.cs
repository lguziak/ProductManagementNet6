// See https://aka.ms/new-console-template for more information
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DatabaseContext;


var host = CreateHostBuilder(args).Build();
static IHostBuilder CreateHostBuilder(string[] args) =>
       Host.CreateDefaultBuilder(args)
       .ConfigureAppConfiguration(SetupConfiguration)
       .ConfigureServices(services =>
       {
           services.AddTransient<DbProductContext>();
          

       });

host.Run();


static void SetupConfiguration(HostBuilderContext ctx, IConfigurationBuilder builder)
{
    // Removing the default configuration options
    // builder.Sources.Clear();
    //NOTE: when dbcontext initiates from different project configuration is not aware of it. NOT USED below


    builder.AddJsonFile("appsettings.json", false, true)
            .AddEnvironmentVariables();

}

