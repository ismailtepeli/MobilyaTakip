using MT.Models;
using MT.Models.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace MT.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddUsers()
        {
            return View();
        }
        public string AddUser(User user)
        {
            var result = UserModel.Add(user);
            return JsonConvert.SerializeObject(result);
        }
        public string UserList()
        {
            var result = UserModel.GetUser();
            return JsonConvert.SerializeObject(result);
        }
        public string EditUser(int Id)
        {
            var result = UserModel.Edit(Id);
            return JsonConvert.SerializeObject(result);
        }
        public string UpdateUser(User user)
        {
            var result = UserModel.Update(user);
            return JsonConvert.SerializeObject(result);
        }
        public string DeleteUser(int Id)
        {
            var result = UserModel.Delete(Id);
            return JsonConvert.SerializeObject(result);
        }
    }
}