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
    }
}