using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class BicycleService
    {
        public static module_bicycle updateBorrowedBic(int bicId)
        {
            var db = new DBModel();
            module_bicycle bicycle = db.module_bicycle.FirstOrDefault(u => u.BicId == bicId);
            bicycle.BicBorrowedCount = bicycle.BicBorrowedCount + 1;
            bicycle.BicBorrowed = 1;
            db.SaveChanges();
            return bicycle;
        }

        public static module_bicycle updateReturnBic(int bicId)
        {
            var db = new DBModel();
            module_bicycle bicycle = db.module_bicycle.FirstOrDefault(u => u.BicId == bicId);
            bicycle.BicBorrowed = 0;
            db.SaveChanges();
            return bicycle;
        }

        public static List<module_bicycle> getAllBicycle()
        {
            var db = new DBModel();
            List < module_bicycle > list = db.module_bicycle.ToList();
            return list;
        }

        public static module_bicycle insertBicycle(module_bicycle bicycle)
        {
            var db = new DBModel();
            db.module_bicycle.Add(bicycle);
            db.SaveChanges();
            return bicycle;
        }

        public static bool deleteBicycleById(int bicId)
        {
            var db = new DBModel();
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
            var db = new DBModel();
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
    }
}