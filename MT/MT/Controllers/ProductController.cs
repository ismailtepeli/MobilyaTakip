using MT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using MT.Models.Types;

namespace MT.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ProductAdd() {
            return View();
        }

        public string ProductList()
        {
            var result = ProductModel.List();
            return JsonConvert.SerializeObject(result);
        }
        public string Add(Product product)
        {
            var result = ProductModel.Add(product);
            return JsonConvert.SerializeObject(result);
        }
        public string Edit(int Id)
        {
            var result = ProductModel.Edit(Id);
            return JsonConvert.SerializeObject(result);
        }
        public string Update(Product product)
        {
            var result = ProductModel.Update(product);
            return JsonConvert.SerializeObject(result);
        }
    }
}