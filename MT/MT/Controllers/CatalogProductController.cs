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
    public class CatalogProductController : Controller
    {
        // GET: CatalogProduct
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CatalogProductAdd()
        {
            return View();
        }
        public string Add(KartelaProduct model)
        {
            var result = KartelaProductModel.Add(model);
            return JsonConvert.SerializeObject(result);
        }
        public string List()
        {
            var result = KartelaProductModel.List();
            return JsonConvert.SerializeObject(result);
        }
        public string Edit(int Id)
        {
            var result = KartelaProductModel.Edit(Id);
            return JsonConvert.SerializeObject(result);
        }
        public string Update(KartelaProduct model)
        {
            var result = KartelaProductModel.Update(model);
            return JsonConvert.SerializeObject(result);
        }
    }
}