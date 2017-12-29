using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class LoginService
    {
        public static module_login insertLogin(module_login login)
        {
            var db = new DBModel();
            db.module_login.Add(login);
            db.SaveChanges();
            return login;
        }
    }
}