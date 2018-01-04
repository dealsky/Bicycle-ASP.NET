using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Bicycle.Models;
using Newtonsoft.Json;

namespace Bicycle.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        [Filters.AdminAuthorize]
        public ActionResult AdminSite()
        {
            return View();
        }

        public JsonResult Login(string adminAcc, string adminPass)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_manager manager = ManagerService.getManagerByAcc(adminAcc);
            if(manager == null)
            {
                dictionary.Add("log", "acc");
            }
            else
            {
                if(manager.MagPass.Equals(adminPass))
                {
                    dictionary.Add("log", "ok");
                    Session["admin"] = manager;
                    Session["adminName"] = manager.MagName;
                }
                else
                {
                    dictionary.Add("log", "pass");
                }
            }
            return Json(dictionary);
        }

        [Filters.AdminAuthorize]
        public ActionResult Logout()
        {
            Session["admin"] = null;
            Session["adminName"] = null;
            return RedirectToAction("Index", "Admin");
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult GetBicycleTable()
        {
            List<module_bicycle> list = BicycleService.getAllBicycle();

            JsonSerializerSettings setting = new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            var ret = JsonConvert.SerializeObject(list, setting);

            return Json(ret);
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult JudgeSite(int siteId)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_site site = SiteService.getSiteById(siteId);
            if(site != null)
            {
                dictionary.Add("errorLog", "right");
            }
            else
            {
                dictionary.Add("errorLog", "error");
            }
            return Json(dictionary);
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult AddBicycle(string bicType, double bicPrice, int siteId)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_bicycle bicycle = new module_bicycle();
            module_park park = new module_park();

            bicycle.BicType = bicType;
            bicycle.BicRentPrice = bicPrice;
            bicycle.BicBuytime = DateTime.Now;
            bicycle.BicBorrowed = 0;
            bicycle.BicBorrowedCount = 0;
            bicycle = BicycleService.insertBicycle(bicycle);
            module_site site = SiteService.updateSiteAmount(siteId, "return");
            park.SiteId = siteId;
            park.BicId = bicycle.BicId;
            park.BicType = bicType;
            park.BicRentPrice = bicPrice;
            park.BicBorrowedCount = 0;
            park.SiteName = site.SiteName;
            park.ParkTime = DateTime.Now;
            ParkService.insertPark(park);
            dictionary.Add("errorLog", "right");
            return Json(dictionary);
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult RemoveBicycle(List<int> arr)
        {
            for(int i = 0; i<arr.Count; i++)
            {
                ParkService.deleteParkByBicId(arr[i]);
                BicycleService.deleteBicycleById(arr[i]);
            }
            return Json("ok");
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult UpdataBicycle(int bicId, string bicType, double bicPrice)
        {
            module_bicycle bicycle = BicycleService.updataBicycleInfo(bicId, bicType, bicPrice);
            if(bicycle != null)
            {
                return Json("ok");
            }
            else
            {
                return Json("error");
            }
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult GetSite()
        {
            List<module_site> list = SiteService.getAllSite();
            JsonSerializerSettings setting = new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            var ret = JsonConvert.SerializeObject(list, setting);
            return Json(ret);
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult AddSite(string siteArea, string siteName)
        {
            module_manager admin = (module_manager)Session["admin"];
            if(admin != null)
            {
                module_site site = new module_site();
                site.MagId = admin.MagId;
                site.SiteArea = siteArea;
                site.SiteName = siteName;
                site.SiteAmount = 0;
                SiteService.insertSite(site);
                return Json("ok");
            }
            else
            {
                return Json("error");
            }
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult RemoveSite(List<int> siteIdList)
        {
            for(int i = 0; i<siteIdList.Count; i++)
            {
                SiteService.deleteSite(siteIdList[i]);
            }
            return Json("ok");
        }

        [HttpPost]
        [Filters.AdminAuthorize]
        public JsonResult UpdataSite(int siteId, string siteName)
        {
            module_site site = SiteService.updataSiteName(siteId, siteName);
            if(site != null)
            {
                return Json("ok");
            }
            else
            {
                return Json("error");
            }
        }
    }
}