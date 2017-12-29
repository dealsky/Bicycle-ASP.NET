using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class RentalCardService
    {
        public static module_rentalcard getRentalCardByUserId(int userId)
        {
            var db = new DBModel();
            var rentalCard = db.module_rentalcard.FirstOrDefault(u => u.UserId == userId);
            return rentalCard;
        }

        public static module_rentalcard insertRentalCard(module_rentalcard rentalcard)
        {
            var db = new DBModel();
            db.module_rentalcard.Add(rentalcard);
            db.SaveChanges();
            return rentalcard;
        }

        public static module_rentalcard getRentalCardById(int recId)
        {
            var db = new DBModel();
            var rentalCard = db.module_rentalcard.FirstOrDefault(u => u.RecId == recId);
            return rentalCard;
        }

        public static void deleteRentalcard(module_rentalcard rentalcard)
        {
            var db = new DBModel();
            db.module_rentalcard.Remove(rentalcard);
            db.SaveChanges();
        }

        public static module_rentalcard updateRecBalance(int recId, double recBalance, string method)
        {
            var db = new DBModel();
            var rentalcard = db.module_rentalcard.FirstOrDefault(u => u.RecId == recId);
            if(method == "in")
            {
                rentalcard.RecBalance += recBalance;
                if (rentalcard.RecBalance > 0)
                {
                    rentalcard.RecStatus = 1;
                }
                db.SaveChanges();
            }
            else
            {
                rentalcard.RecBalance -= recBalance;
                if (rentalcard.RecBalance <= 0)
                {
                    rentalcard.RecStatus = 0;
                }
                db.SaveChanges();
            }
            return rentalcard;
        }
    }
}