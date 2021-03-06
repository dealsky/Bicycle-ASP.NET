﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bicycle.Models.dto;

namespace Bicycle.Models
{
    public class UserService
    {
        private static DBModel db = new DBModel();
        public static module_user getUserByAcc(string userAcc)
        {
            List<module_user> userList = db.module_user.Where(u => u.UserAcc == userAcc).OrderBy(u => u.UserId).ToList();
            if (userList.Count != 0)
            {
                return userList[0];
            }
            else
            {
                return null;
            }
        }

        public static module_user getUserByEmail(string userEmail)
        {
            List<module_user> userList = db.module_user.Where(u => u.UserEmail == userEmail).OrderBy(u => u.UserId).ToList();
            if(userList.Count != 0)
            {
                return userList[0];
            }
            else
            {
                return null;
            }
        }

        public static Dictionary<string, object> isUserBeing(string userAcc, string userPass)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            module_user user = getUserByAcc(userAcc);
            if(user == null)
            {
                dictionary.Add("status", 1);    //用户不存在
            }
            else
            {
                if(user.UserPass == userPass)
                {
                    dictionary.Add("status", 2);   //正确
                    dictionary.Add("user", user);
                }
                else
                {
                    dictionary.Add("status", 3);   //密码错误
                }
            }
            return dictionary;
        }

        public static module_user insertUser(module_user user)
        {
            db.module_user.Add(user);
            db.SaveChanges();
            return user;
        }

        public static module_user getUserById(int userId)
        {
            module_user user = db.module_user.Where(u => u.UserId == userId).ToList()[0];
            return user;
        }

        public static ModuleUser getUserByIdG(int userId)
        {
            List<ModuleUser> list = db.module_user.Where(u => u.UserId == userId)
                .Select(u => new ModuleUser()
                {
                    UserId = u.UserId,
                    UserName = u.UserName,
                    UserSex = u.UserSex,
                    UserAcc = u.UserAcc,
                    UserTel = u.UserTel,
                    UserIdCard = u.UserIdCard,
                    UserEmail = u.UserEmail
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

        public static module_user updateUserPass(int userId, string userPass)
        {
            var user = db.module_user.FirstOrDefault(u => u.UserId == userId);
            user.UserPass = userPass;
            db.SaveChanges();
            return user;
        }

        public static module_user updateUserLoginTime(int userId, DateTime dateTime)
        {
            var user = db.module_user.FirstOrDefault(u => u.UserId == userId);
            user.UserLastLoginTime = dateTime;
            db.SaveChanges();
            return user;
        }

        public static module_user updateUserInfo(int userId, string userName, string userEmail, string userTel, string userIdCard, int userSex)
        {
            var user = db.module_user.FirstOrDefault(u => u.UserId == userId);
            user.UserName = userName;
            user.UserEmail = userEmail;
            user.UserTel = userTel;
            user.UserIdCard = userIdCard;
            user.UserSex = userSex;
            db.SaveChanges();
            return user;
        }
    }
}