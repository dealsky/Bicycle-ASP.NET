using Bicycle.Models.dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bicycle.Models
{
    public class RentalCardService
    {
        private static DBModel db = new DBModel();
        public static module_rentalcard getRentalCardByUserId(int userId)
        {
            var rentalCard = db.module_rentalcard.FirstOrDefault(u => u.UserId == userId);
            return rentalCard;
        }

        public static ModuleRentalCard getRentalCardByUserIdG(int userId)
        {
            List<ModuleRentalCard> list = db.module_rentalcard.Where(r => r.UserId == userId)
                .Select(r => new ModuleRentalCard()
                {
                    RecId = r.RecId,
                    UserId = r.UserId,
                    RecBalance = r.RecBalance,
                    RecStatus = r.RecStatus,
                    RecOptime = r.RecOptime
                }).ToList();
            if(list.Count != 0)
            {
                return list[0];
            }
            else
            {
                return null;
            }
        }

        public static module_rentalcard insertRentalCard(module_rentalcard rentalcard)
        {
            db.module_rentalcard.Add(rentalcard);
            db.SaveChanges();
            return rentalcard;
        }

        public static module_rentalcard getRentalCardById(int recId)
        {
            var rentalCard = db.module_rentalcard.FirstOrDefault(u => u.RecId == recId);
            return rentalCard;
        }

        public static void deleteRentalcard(module_rentalcard rentalcard)
        {
            db.module_rentalcard.Remove(rentalcard);
            db.SaveChanges();
        }

        public static module_rentalcard updateRecBalance(int recId, double recBalance, string method)
        {
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