using MT.Models;
using MT.Models.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MT.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(User user)
        {
            if (ModelState.IsValid)
            {
                var result = UserModel.GetUserLogin(user);
                if (result.Count>0)
                {
                    Session["UserId"] = result[0].Id;
                    Session["UserName"] = result[0].NameSurname;
                    Session["Email"] = result[0].Email  ;
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    return RedirectToAction("Index", "Login");
                }
               
            }
            else
            {
                return View();
            }

        }
    }
}