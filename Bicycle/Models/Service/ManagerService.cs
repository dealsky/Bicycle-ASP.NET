using Bicycle.Models.dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class ManagerService
    {
        private static DBModel db = new DBModel();
        public static module_manager getManagerByAcc(string magAcc)
        {
            var manager = db.module_manager.FirstOrDefault(u => u.MagAcc.Equals(magAcc));
            return manager;
        }

        public static ModuleManager getManagerByIdG(int magId)
        {
            List<ModuleManager> list = db.module_manager.Where(m => m.MagId == magId)
                .Select(m => new ModuleManager()
                {
                    MagName = m.MagName,
                    MagSex = m.MagSex,
                    MagTel = m.MagTel
                }).ToList();
            if(list.Count != 0)
            {
                return list[0];
            }
            else
            {
                return null;
            }
        }
    }
}