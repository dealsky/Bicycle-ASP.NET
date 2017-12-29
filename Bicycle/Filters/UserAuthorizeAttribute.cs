using Bicycle.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bicycle.Filters
{
    public class UserAuthorizeAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Session["user"] == null)
            {
                filterContext.HttpContext.Response.Redirect("/User/Index");
            }
        }
    }
}
