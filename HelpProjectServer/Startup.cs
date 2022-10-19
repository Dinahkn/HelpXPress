using HelpProjectServer.Data;
using HelpProjectServer.Data.DTO;
using HelpProjectServer.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("HelpXpressDB");
            services.AddDbContext<HelpDBContext>(options => options.UseSqlServer(connectionString));
            services.Configure<EmailConfigurationDTO>(Configuration.GetSection("EmailConfiguration"));
            services.AddCors();
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });
            services.AddTransient<UsersService>();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = JwtService.TokenValidationParameters;
                });
            services.AddTransient<JwtService>();
            services.AddTransient<OfferTeachersService>();
            services.AddTransient<NeedTeachersService>();
            services.AddTransient<OfferBabysittersService>();
            services.AddTransient<NeedBabysittersService>();
            services.AddTransient<OfferCarpoolService>();
            services.AddTransient<NeedCarpoolService>();
            services.AddTransient<HelpCategoryService>();
            services.AddTransient<SubjectSchoolService>();
            services.AddTransient<LevelsService>();
            services.AddTransient<CityService>();
            services.AddTransient<ContactService>();
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(x => x
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowAnyOrigin());// allow any origin
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
