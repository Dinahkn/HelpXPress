using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Middleware
{
    public class AllowedCorsMiddleware
    {
        private readonly RequestDelegate _next;
        public AllowedCorsMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            //solution pour CORS
            //Responsable des noms des serveurs qu'ils sont autorisés à traverser
            context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            context.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "*" });
            context.Response.Headers.Add("Access-Control-Allow-Origin-Methods", new[] { "*" });
            //before server
            await _next(context);
            //after server
        }
    }
}
