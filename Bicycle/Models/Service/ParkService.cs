using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class ParkService
    {
        private static DBModel db = new DBModel();
        public static bool deleteParkById(int parkId)
        {
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
            db.module_park.Add(park);
            db.SaveChanges();
            return park;
        }

        public static bool deleteParkByBicId(int bicId)
        {
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

        public static List<module_park> getParkBySiteId(int siteId)
        {
            return db.module_park.Where(u => u.SiteId == siteId).ToList();
        }
    }
}
