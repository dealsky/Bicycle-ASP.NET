using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class SiteService
    {
        public static List<module_site> getSiteByArea(string siteArea)
        {
            var db = new DBModel();
            List<module_site> list = db.module_site.Where(u => u.SiteArea == siteArea).OrderBy(u => u.SiteAmount).ToList();
            return list;
        }

        public static module_site updateSiteAmount(int siteId, string method)
        {
            var db = new DBModel();
            module_site site = db.module_site.FirstOrDefault(u => u.SiteId == siteId);
            if(method.Equals("borrow"))
            {
                site.SiteAmount = site.SiteAmount - 1;
            }
            else
            {
                site.SiteAmount = site.SiteAmount + 1;
            }
            db.SaveChanges();
            return site;
        }

        public static module_site getSiteById(int siteId)
        {
            var db = new DBModel();
            var site = db.module_site.FirstOrDefault(u => u.SiteId == siteId);
            return site;
        }

        public static List<module_site> getAllSite()
        {
            var db = new DBModel();
            List<module_site> list = db.module_site.OrderBy(u => u.SiteAmount).ToList();
            return list;
        }
    }
}