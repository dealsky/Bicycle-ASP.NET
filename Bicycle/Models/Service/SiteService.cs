﻿using Bicycle.Models.dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class SiteService
    {
        private static DBModel db = new DBModel();
        public static List<module_site> getSiteByArea(string siteArea)
        {
            List<module_site> list = db.module_site.Where(u => u.SiteArea == siteArea).OrderBy(u => u.SiteAmount).ToList();
            return list;
        }

        public static List<ModuleSite> getSiteByAreaG(string siteArea)
        {
            List<ModuleSite> list = db.module_site.Where(s => s.SiteArea.Equals(siteArea))
                .Select(s => new ModuleSite() {
                    SiteId = s.SiteId,
                    MagId = s.MagId,
                    SiteName = s.SiteName,
                    SiteArea = s.SiteArea,
                    SiteAmount = s.SiteAmount
                }).ToList();
            return list;
        }

        public static module_site updateSiteAmount(int siteId, string method)
        {
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
            var site = db.module_site.FirstOrDefault(u => u.SiteId == siteId);
            return site;
        }

        public static List<module_site> getAllSite()
        {
            List<module_site> list = db.module_site.OrderBy(u => u.SiteAmount).ToList();
            return list;
        }

        public static module_site insertSite(module_site site)
        {
            db.module_site.Add(site);
            db.SaveChanges();
            return site;
        }

        public static bool deleteSite(int siteId)
        {
            module_site site = db.module_site.FirstOrDefault(u => u.SiteId == siteId);
            if(site != null)
            {
                db.module_site.Remove(site);
                db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public static module_site updataSiteName(int siteId, string siteName)
        {
            module_site site = db.module_site.FirstOrDefault(u => u.SiteId == siteId);
            if(site != null)
            {
                site.SiteName = siteName;
                db.SaveChanges();
                return site;
            }
            else
            {
                return null;
            }
        }

        public static List<SiteTable> getSiteTable()
        {
            List<SiteTable> list = db.module_site.Join(db.module_manager, s => s.MagId, m => m.MagId, (s, m) => new SiteTable()
            {
                SiteId = s.SiteId,
                MagId = s.MagId,
                MagName = m.MagName,
                SiteName = s.SiteName,
                SiteArea = s.SiteArea,
                SiteAmount = s.SiteAmount
            }).ToList();
            return list;
        }
    }
}