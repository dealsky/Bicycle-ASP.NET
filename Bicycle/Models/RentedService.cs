using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class RentedService
    {
        public static List<module_rented> getRentedByUserId(int userId, string method)
        {
            var db = new DBModel();
            List<module_rented> list = new List<module_rented>();
            if(method.Equals("borrowed"))
            {
                var rented = db.module_rented.FirstOrDefault(u => u.UserId == userId && u.RentStatus == 1);
                if(rented == null)
                {
                    return null;
                }
                else
                {
                    list.Add(rented);
                    return list;
                }
            }
            else
            {
                list = db.module_rented.Where(u => u.UserId == userId).ToList();
                return list;
            }
        }

        public static module_rented insertRented(module_rented rented)
        {
            var db = new DBModel();
            db.module_rented.Add(rented);
            db.SaveChanges();
            return rented;
        }

        public static module_rented updateReturnRented(int rentId, double price)
        {
            var db = new DBModel();
            var rented = db.module_rented.FirstOrDefault(u => u.RentId == rentId);
            rented.RentPrice = price;
            rented.RentStatus = 0;
            rented.RentRenTime = DateTime.Now;
            db.SaveChanges();
            return rented;
        }
    }
}