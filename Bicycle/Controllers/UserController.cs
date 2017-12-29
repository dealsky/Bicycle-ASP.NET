using Bicycle.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Bicycle.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        [Filters.UserAuthorize]
        public ActionResult UserInfo()
        {
            return View();
        }

        [Filters.UserAuthorize]
        public ActionResult Bicycle()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string userAcc, string userPass)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            Dictionary<string, object> userMap = UserService.isUserBeing(userAcc, userPass);
            int status = (int)userMap["status"];
            if (status == 2)
            {
                module_user user = (module_user)userMap["user"];
                DateTime now = DateTime.Now;
                user = UserService.updateUserLoginTime(user.UserId, now);
                dictionary.Add("log", "ok");
                Session["user"] = user;
                Session["username"] = user.UserName;

                module_login login = new module_login();

                login.UserId = user.UserId;
                login.UserName = user.UserName;
                login.LoginTime = now;
                LoginService.insertLogin(login);
            }
            else if(status == 1)
            {
                dictionary.Add("log", "null");
            }
            else
            {
                dictionary.Add("log", "passError");
            }
            return Json(dictionary);
        }

        [Filters.UserAuthorize]
        public ActionResult Logout()
        {
            Session["user"] = null;
            Session["username"] = null;
            return RedirectToAction("Index", "User");
        }

        [HttpPost]
        public JsonResult RegUserAcc(string userAcc)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = UserService.getUserByAcc(userAcc);
            if(user == null)
            {
                dictionary.Add("message", "right");
            }
            else
            {
                dictionary.Add("message", "error");
            }
            return Json(dictionary);
        }

        [HttpPost]
        public JsonResult RegUserEmail(string userEmail)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = UserService.getUserByEmail(userEmail);
            if (user == null)
            {
                dictionary.Add("message", "right");
            }
            else
            {
                dictionary.Add("message", "error");
            }
            return Json(dictionary);
        }

        [HttpPost]
        public JsonResult Register(string userAcc, string userPass, string userEmail, string userName)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = new module_user();
            DateTime now = DateTime.Now;
            user.UserAcc = userAcc;
            user.UserPass = userPass;
            user.UserEmail = userEmail;
            user.UserName = userName;
            user.UserRegTime = now;
            user.UserLastLoginTime = now;
            user = UserService.insertUser(user);
            Session["user"] = user;
            Session["username"] = user.UserName;
            dictionary.Add("meg", "right");

            module_login login = new module_login();
            login.UserId = user.UserId;
            login.UserName = user.UserName;
            login.LoginTime = now;
            LoginService.insertLogin(login);
            return Json(dictionary);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult PassRight(string userPass)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = (module_user)Session["user"];
            if(user.UserPass.Equals(userPass))
            {
                dictionary.Add("message", "right");
            }
            else
            {
                dictionary.Add("message", "error");
            }
            return Json(dictionary);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult ChangePass(string userPass)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = (module_user)Session["user"];
            user = UserService.updateUserPass(user.UserId, userPass);
            dictionary.Add("message", "success");
            return Json(dictionary);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult GetUserInfo()
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = (module_user)Session["user"];
            if(user != null)
            {
                user.UserPass = "";
                //user.module_login = null;
                user.module_rentalcard = null;
                user.module_rented = null;
                dictionary.Add("user", user);
                dictionary.Add("log", "right");
            }
            else
            {
                dictionary.Add("log", "error");
            }

            JsonSerializerSettings setting = new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            var ret = JsonConvert.SerializeObject(dictionary, setting);

            return Json(ret);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public ActionResult UpdateUserInfo(string userName, string userEmail, string userTel, string userIdCard, string userSex)
        {
            module_user user = (module_user)Session["user"];
            int sexStatus = userSex.Equals("female") ? 0 : 1;
            user = UserService.updateUserInfo(user.UserId, userName, userEmail, userTel, userIdCard, sexStatus);
            Session["user"] = user;
            return RedirectToAction("UserInfo", "User");
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult GetUserRentalCard()
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = (module_user)Session["user"];
            module_rentalcard rentalCard = RentalCardService.getRentalCardByUserId(user.UserId);
            if(rentalCard == null)
            {
                dictionary.Add("rentalCard", null);
            }
            else
            {
                dictionary.Add("rentalCard", rentalCard);
            }

            JsonSerializerSettings setting = new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            var ret = JsonConvert.SerializeObject(dictionary, setting);

            return Json(ret);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult AddRentalCard()
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = (module_user)Session["user"];
            module_rentalcard rentalcard = new module_rentalcard();
            rentalcard.UserId = user.UserId;
            rentalcard.RecStatus = 0;
            rentalcard.RecBalance = 0;
            rentalcard.RecOptime = DateTime.Now;
            RentalCardService.insertRentalCard(rentalcard);
            dictionary.Add("log", "ok");
            return Json(dictionary);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult DeleteRentalCard(int recid)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            var db = new DBModel();
            var rentalCard = db.module_rentalcard.FirstOrDefault(u => u.RecId == recid);
            if (rentalCard != null)
            {
                db.module_rentalcard.Remove(rentalCard);
                db.SaveChanges();
                dictionary.Add("log", "ok");
            }
            else
            {
                dictionary.Add("log", "error");
            }
            return Json(dictionary);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult ChargeMoney(int recid, double addMoney)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_rentalcard rentalcard = RentalCardService.updateRecBalance(recid, addMoney, "in");
            if(rentalcard != null)
            {
                dictionary.Add("log", "ok");
            }
            else
            {
                dictionary.Add("log", "error");
            }
            return Json(dictionary);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult SelectedSite(string siteArea)
        {
            List<module_site> list = SiteService.getSiteByArea(siteArea);
            JsonSerializerSettings setting = new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            var ret = JsonConvert.SerializeObject(list, setting);
            return Json(ret);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult BorrowBicycle(int bicId, double price, string bicType, int parkId, int siteId)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = (module_user)Session["user"];
            List<module_rented> list = RentedService.getRentedByUserId(user.UserId, "borrowed");
            if(list == null)
            {
                module_rentalcard rentalCard = RentalCardService.getRentalCardByUserId(user.UserId);
                if(rentalCard == null)
                {
                    dictionary.Add("log", "rentalCard");
                }
                else
                {
                    if(rentalCard.RecBalance >= price)
                    {
                        module_rented rented = new module_rented();
                        rented.BicId = bicId;
                        rented.UserId = user.UserId;
                        rented.UserName = user.UserName;
                        rented.BicType = bicType;
                        rented.BicRentPrice = price;
                        rented.RentPrice = 0;
                        rented.RentStatus = 1;
                        rented.RentBowTime = DateTime.Now;
                        rented = RentedService.insertRented(rented);
                        BicycleService.updateBorrowedBic(bicId);
                        SiteService.updateSiteAmount(siteId, "borrow");
                        ParkService.deleteParkById(parkId);

                        if(rented != null)
                        {
                            dictionary.Add("rentedId", rented.RentId);
                        }
                        dictionary.Add("log", "ok");
                    }
                    else
                    {
                        dictionary.Add("log", "money");
                    }
                }
            }
            else
            {
                dictionary.Add("log", "borrowed");
            }
            return Json(dictionary);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult BorrowedBicycle()
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = (module_user)Session["user"];
            List<module_rented> list = RentedService.getRentedByUserId(user.UserId, "borrowed");
            if(list != null)
            {
                module_rented rented = list[0];
                dictionary.Add("log", "ok");
                dictionary.Add("rented", rented);
            }
            else
            {
                dictionary.Add("log", "none");
            }
            JsonSerializerSettings setting = new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            var ret = JsonConvert.SerializeObject(dictionary, setting);
            return Json(ret);
        }

        [Filters.UserAuthorize]
        [HttpPost]
        public JsonResult RetuenBicycle(int bicId, double price, int siteId, int rentId)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = (module_user)Session["user"];
            module_site site = SiteService.getSiteById(siteId);
            if(site == null)
            {
                dictionary.Add("log", "siteNone");
            }
            else
            {
                if(site.SiteAmount == 30)
                {
                    dictionary.Add("log", "siteOver");
                }
                else
                {
                    module_rentalcard rentalcard = RentalCardService.getRentalCardByUserId(user.UserId);
                    module_bicycle bicycle = BicycleService.updateReturnBic(bicId);
                    SiteService.updateSiteAmount(siteId, "return");
                    RentedService.updateReturnRented(rentId, price);

                    module_park park = new module_park();
                    park.SiteId = siteId;
                    park.BicId = bicId;
                    park.BicType = bicycle.BicType;
                    park.BicRentPrice = bicycle.BicRentPrice;
                    park.BicBorrowedCount = bicycle.BicBorrowedCount;
                    park.SiteName = site.SiteName;
                    park.ParkTime = DateTime.Now;
                    ParkService.insertPark(park);

                    if(rentalcard != null)
                    {
                        RentalCardService.updateRecBalance(rentalcard.RecId, price, "out");
                    }
                    
                    dictionary.Add("log", "ok");
                }
            }
            return Json(dictionary);
        }

    }
}
