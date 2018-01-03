using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class ParkService
    {
        public static bool deleteParkById(int parkId)
        {
            var db = new DBModel();
            var park = db.module_park.FirstOrDefault(u => u.ParkId == parkId);
            if(park != null)
            {
                db.module_park.Remove(park);
                db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public static module_park insertPark(module_park park)
        {
            var db = new DBModel();
            db.module_park.Add(park);
            db.SaveChanges();
            return park;
        }

        public static bool deleteParkByBicId(int bicId)
        {
            var db = new DBModel();
            var park = db.module_park.FirstOrDefault(u => u.BicId == bicId);
            if (park != null)
            {
                SiteService.updateSiteAmount(park.SiteId, "borrow");
                db.module_park.Remove(park);
                db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
