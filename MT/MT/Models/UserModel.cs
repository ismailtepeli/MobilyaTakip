using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MT.Models.Types;

namespace MT.Models
{
    public class UserModel
    {
        public static int Add(User user)
        {
            try
            {
                using (var db = new MTSEntities())
                {
                    var temp = new User
                    {
                        Email = user.Email,
                        NameSurname = user.NameSurname,
                        Password = user.Password
                    };
                    db.Users.Add(temp);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static List<User> GetUser()
        {
            using (var db = new MTSEntities())
            {
                
                var users = (from x in db.Users select x).ToList();
                return users;
            }
        }

        public static List<User> Edit(int Id)
        {
            using (var db = new MTSEntities())
            {
                var users = (from x in db.Users where x.Id == Id select x).ToList();
                return users;
            }
        }

        public static int Update(User user)
        {
            try
            {
                using (var db=new MTSEntities())
                {
                    User temp = db.Users.SingleOrDefault(x => x.Id == user.Id);
                    temp.NameSurname = user.NameSurname;
                    temp.Password = user.Password;
                    temp.Email = user.Email;
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static int Delete(int Id)
        {
            try
            {
                using (var db=new MTSEntities())
                {
                    var tempToRemove = db.Users.SingleOrDefault(x => x.Id == Id);
                    if (tempToRemove!=null)
                    {
                        db.Users.Remove(tempToRemove);
                        db.SaveChanges();
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static List<User> GetUserLogin(User user)
        {
            using (var db=new MTSEntities())
            {
                var getuser = (from x in db.Users
                               where x.Email == user.Email && x.Password == user.Password
                               select x).ToList();
                return getuser;
            }
        }
    }
}