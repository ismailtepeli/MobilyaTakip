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
    public class MDLController : Controller
    {
        // GET: MDL
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddMdl()
        {
            return View();
        }
        public string Add(tblModel model)
        {
            var result = MDLModel.Add(model);
            return JsonConvert.SerializeObject(result);
        }
        public string List()
        {
            var result = MDLModel.List();
            return JsonConvert.SerializeObject(result);
        }
        public string Edit(int Id)
        {
            var result = MDLModel.Edit(Id);
            return JsonConvert.SerializeObject(result);
        }
        public string Update(tblModel model)
        {
            var result = MDLModel.Update(model);
            return JsonConvert.SerializeObject(result);
        }
        public string Delete(int Id)
        {
            var result = MDLModel.Delete(Id);
            return JsonConvert.SerializeObject(result);
        }
    }
}