using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MT.Models.Types;
using System.Data.Entity.SqlServer;

namespace MT.Models
{
    public class OrderModel
    {
        public static int Add(Order order)
        {
            try
            {
                using (var db = new MTSEntities())
                {
                    var item = new Order
                    {
                        Cila = order.Cila,
                        CustomerId = order.CustomerId,
                        Description = order.Description,
                        FinishDate = order.FinishDate,
                        KaporaPrice = order.KaporaPrice,

                        KartelaId = order.KartelaId,
                        KartelaModelId = order.KartelaModelId,
                        ModelId = order.ModelId,

                        ProductId = order.ProductId,
                        StartDate = order.StartDate,
                        TotalPrice = order.TotalPrice,

                        ProductId2 = order.ProductId2,
                        ModelId2 = order.ModelId2,
                        KartelaId2 = order.KartelaId2,
                        KartelaModelId2 = order.KartelaModelId2,
                        Cila2 = order.Cila2,
                        Description2 = order.Description2,

                        ProductId3 = order.ProductId3,
                        ModelId3 = order.ModelId3,
                        KartelaId3 = order.KartelaId3,
                        KartelaModelId3 = order.KartelaModelId3,
                        Cila3 = order.Cila3,
                        Description3 = order.Description3,

                        ProductId4 = order.ProductId4,
                        ModelId4 = order.ModelId4,
                        KartelaId4 = order.KartelaId4,
                        KartelaModelId4 = order.KartelaModelId4,
                        Cila4 = order.Cila4,
                        Description4 = order.Description4,

                        KaporaType = order.KaporaType,
                        PaymentType = order.PaymentType,

                    };
                    db.Orders.Add(item);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static List<OrderCustomerProduct> FirstLoginPageOrderList()
        {

            using (var db = new MTSEntities())
            {
                var orderList = (from order in db.Orders
                                 join customer in db.Customers on order.CustomerId equals customer.Id
                                 select new OrderCustomerProduct
                                 {
                                     Id = order.Id,
                                     CustomerId = customer.Id,
                                     NameSurname = customer.NameSurname,
                                     Phone1 = customer.Phone1,
                                     //StartDate = Convert.ToDateTime(order.StartDate)
                                     //FinishDate=Convert.ToDateTime(order.FinishDate),
                                     // TotalPrice=Convert.ToDouble(order.TotalPrice)
                                 }
                               ).ToList();
                return orderList;
            }
        }


        public static List<OrderCustomerProduct> OrderDetail(int Id)//Sipariş Id sine göre getiyor
        {
            using (var db = new MTSEntities())
            {
                var detail = (from order in db.Orders
                              join customer in db.Customers on order.CustomerId equals customer.Id
                              join product in db.Products on order.ProductId equals product.Id
                              join model in db.tblModels on  order.ModelId equals model.Id
                              join kartela in db.Kartelas on  order.KartelaId equals kartela.Id
                              join kartelaModel in db.KartelaProducts on order.KartelaModelId equals kartelaModel.Id

                              join product2 in db.Products on order.ProductId2 equals product2.Id
                              join model2 in db.tblModels on order.ModelId2 equals model2.Id
                              join kartela2 in db.Kartelas on order.KartelaId2 equals kartela2.Id
                              join kartelaModel2 in db.KartelaProducts on order.KartelaModelId2 equals kartelaModel2.Id

                              join product3 in db.Products on order.ProductId3 equals product3.Id
                              join model3 in db.tblModels on order.ModelId3 equals model3.Id
                              join kartela3 in db.Kartelas on order.KartelaId3 equals kartela3.Id
                              join kartelaModel3 in db.KartelaProducts on order.KartelaModelId3 equals kartelaModel3.Id

                              join product4 in db.Products on order.ProductId4 equals product4.Id
                              join model4 in db.tblModels on order.ModelId4 equals model4.Id
                              join kartela4 in db.Kartelas on order.KartelaId4 equals kartela4.Id
                              join kartelaModel4 in db.KartelaProducts on order.KartelaModelId4 equals kartelaModel4.Id

                              where order.Id == Id
                              
                              select new OrderCustomerProduct
                              {
                                  Id = order.Id,
                                  CustomerId = customer.Id,
                                  ProductId=product.Id,
                                  ModelId=model.Id,
                                  KartelaId=kartela.Id,
                                  NameSurname = customer.NameSurname,
                                  Adress=customer.Adress,
                                  Phone1=customer.Phone1,
                                  Phone2=customer.Phone2,
                                  ProductName=product.ProductName,
                                  ModelName=model.ModelName,
                                  KartelaName=kartela.KartelaName,
                                  KartelaProductName=kartelaModel.ProductName,
                                  Cila=order.Cila,
                                  Description=order.Description,

                                  ProductName2 = product2.ProductName,
                                  ModelName2 = model2.ModelName,
                                  KartelaName2 = kartela2.KartelaName,
                                  KartelaProductName2 = kartelaModel2.ProductName,
                                  Cila2 = order.Cila2,
                                  Description2 = order.Description2,

                                  ProductName3 = product3.ProductName,
                                  ModelName3 = model3.ModelName,
                                  KartelaName3 = kartela3.KartelaName,
                                  KartelaProductName3 = kartelaModel3.ProductName,
                                  Cila3 = order.Cila3,
                                  Description3 = order.Description3,

                                  ProductName4 = product4.ProductName,
                                  ModelName4 = model4.ModelName,
                                  KartelaName4 = kartela4.KartelaName,
                                  KartelaProductName4 = kartelaModel4.ProductName,
                                  Cila4 = order.Cila4,
                                  Description4 = order.Description4
                              }
                            ).ToList();
                return detail;
            }
        }


    }
}