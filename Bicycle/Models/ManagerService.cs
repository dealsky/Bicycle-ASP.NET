using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class ManagerService
    {
        public static module_manager getManagerByAcc(string magAcc)
        {
            var db = new DBModel();
            var manager = db.module_manager.FirstOrDefault(u => u.MagAcc.Equals(magAcc));
            return manager;
        }
    }
}