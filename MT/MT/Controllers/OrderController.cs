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
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddOrder()
        {
            return View();
        }

        public  string AddCustomer(Customer customer)
        {
            var result = CustomerModel.Add(customer);
            return JsonConvert.SerializeObject(result);
        }
        public string CustomerList()
        {
            var result = CustomerModel.List();
            return JsonConvert.SerializeObject(result);
        }
        public string ProductList()
        {
            var result = ProductModel.List();
            return JsonConvert.SerializeObject(result);
        }
        public string ProdocutForModel(int ProductId)
        {
            var result = MDLModel.ProductForModel(ProductId);
            return JsonConvert.SerializeObject(result);
        }
        public string KartelaList()
        {
            var result = KartelaModel.List();
            return JsonConvert.SerializeObject(result);
        }
        public string KartelaForProduct(int KartelaId)
        {
            var result = KartelaProductModel.KartelaForProduct(KartelaId);
            return JsonConvert.SerializeObject(result);
        }

        public string orderAdd(Order order)
        {
            var result = OrderModel.Add(order);
            return JsonConvert.SerializeObject(result);

        }
        public string FirstLoginOrderList()
        {
            var result = OrderModel.FirstLoginPageOrderList();
            return JsonConvert.SerializeObject(result);
        }


        public string OrderDetail(int Id)
        {
            var result = OrderModel.OrderDetail(Id);
            return JsonConvert.SerializeObject(result);
        }
    }
}