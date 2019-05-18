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
    public class CatalogController : Controller
    {
        // GET: Catalog
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddCatalog()
        {
            return View();
        }
        public string Add(Kartela kartela)
        {
            var result = KartelaModel.Add(kartela);
            return JsonConvert.SerializeObject(result);
        }
        public string List()
        {
            var result = KartelaModel.List();
            return JsonConvert.SerializeObject(result);
        }
        public string Edit(int Id)
        {
            var result = KartelaModel.Edit(Id);
            return JsonConvert.SerializeObject(result);
        }
        public string Update(Kartela kartela)
        {
            var result = KartelaModel.Update(kartela);
            return JsonConvert.SerializeObject(result);
        }
        public string Delete(int Id)
        {
            var result = KartelaModel.Delete(Id);
            return JsonConvert.SerializeObject(result);
        }
    }
}