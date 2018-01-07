using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class BicycleService
    {
        private static DBModel db = new DBModel();
        public static module_bicycle updateBorrowedBic(int bicId)
        {
            module_bicycle bicycle = db.module_bicycle.FirstOrDefault(u => u.BicId == bicId);
            bicycle.BicBorrowedCount = bicycle.BicBorrowedCount + 1;
            bicycle.BicBorrowed = 1;
            db.SaveChanges();
            return bicycle;
        }

        public static module_bicycle updateReturnBic(int bicId)
        {
            module_bicycle bicycle = db.module_bicycle.FirstOrDefault(u => u.BicId == bicId);
            bicycle.BicBorrowed = 0;
            db.SaveChanges();
            return bicycle;
        }

        public static List<module_bicycle> getAllBicycle()
        {
            List < module_bicycle > list = db.module_bicycle.ToList();
            return list;
        }

        public static module_bicycle insertBicycle(module_bicycle bicycle)
        {
            db.module_bicycle.Add(bicycle);
            db.SaveChanges();
            return bicycle;
        }

        public static bool deleteBicycleById(int bicId)
        {
            var bicycle = db.module_bicycle.FirstOrDefault(u => u.BicId == bicId);
            if (bicycle != null)
            {
                db.module_bicycle.Remove(bicycle);
                db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public static module_bicycle updataBicycleInfo(int bicId, string bicType, double bicPrice)
        {
            module_bicycle bicycle = db.module_bicycle.FirstOrDefault(u => u.BicId == bicId);
            if(bicycle != null)
            {
                bicycle.BicType = bicType;
                bicycle.BicRentPrice = bicPrice;
                db.SaveChanges();
                return bicycle;
            }
            else
            {
                return null;
            }
        }

        public static List<BicycleTable> getBicycleTable()
        {
            List<BicycleTable> list1 = db.module_bicycle.Join(db.module_park, b => b.BicId, p => p.BicId, (b, p) => new BicycleTable()
            {
                BicId = b.BicId,
                BicType = b.BicType,
                BicRentPrice = b.BicRentPrice,
                SiteId = p.SiteId,
                SiteName = p.SiteName,
                UserName = null,
                BicBorrowed = b.BicBorrowed,
                BicBorrowedCount = b.BicBorrowedCount,
                BicBuytime = b.BicBuytime
            }).ToList();

            List<BicycleTable> list2 = db.module_bicycle.Where(b => b.BicBorrowed == 1)
                .Join(db.module_rented, b => b.BicId, r => r.BicId, (b, r) => new BicycleTable()
            {
                BicId = b.BicId,
                BicType = b.BicType,
                BicRentPrice = b.BicRentPrice,
                SiteId = -1,
                SiteName = null,
                UserName = r.UserName,
                BicBorrowed = b.BicBorrowed,
                BicBorrowedCount = b.BicBorrowedCount,
                BicBuytime = b.BicBuytime
            }).ToList();
            List<BicycleTable> list;
            list = list1.Union(list2).ToList<BicycleTable>();
            return list;
        }
    }
}