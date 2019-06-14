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
                #region asdasdas
                var detail = (from order in db.Orders
                              join customer in db.Customers on order.CustomerId equals customer.Id
                              into customerNull from CCNull in customerNull.DefaultIfEmpty()

                              join product in db.Products on order.ProductId equals product.Id
                              into productNull        from ppNull in productNull.DefaultIfEmpty()

                              join model in db.tblModels on order.ModelId equals model.Id
                               into  modelNull        from mdlNull in modelNull.DefaultIfEmpty()

                              join kartela in db.Kartelas on order.KartelaId equals kartela.Id
                                 into  KartelaNull        from KNull in KartelaNull.DefaultIfEmpty()

                              join kartelaModel in db.KartelaProducts on order.KartelaModelId equals kartelaModel.Id
                               into  KmodelNull        from KMNull in KmodelNull.DefaultIfEmpty()



                              join product2 in db.Products on order.ProductId2 equals product2.Id
                                 into  product2Null        from ProNull in product2Null.DefaultIfEmpty()

                              join model2 in db.tblModels on order.ModelId2 equals model2.Id
                                 into  model2Null        from mdl2Null in model2Null.DefaultIfEmpty()

                              join kartela2 in db.Kartelas on order.KartelaId2 equals kartela2.Id
                                 into kartela2Null
                              from K2Null in kartela2Null.DefaultIfEmpty()

                              join kartelaModel2 in db.KartelaProducts   on order.KartelaModelId2 equals kartelaModel2.Id
                                into Kmodel2Null
                              from KM2Null in Kmodel2Null.DefaultIfEmpty()


                              join product3 in db.Products on order.ProductId3 equals product3.Id
                                into product3Null
                              from Pro3Null in product3Null.DefaultIfEmpty()

                              join model3 in db.tblModels on order.ModelId3 equals model3.Id
                               into model3Null
                              from mdl3Null in model3Null.DefaultIfEmpty()

                              join kartela3 in db.Kartelas on order.KartelaId3 equals kartela3.Id
                               into kartela3Null
                              from K3Null in kartela3Null.DefaultIfEmpty()

                              join kartelaModel3 in db.KartelaProducts on order.KartelaModelId3 equals kartelaModel3.Id
                                      into Kmodel3Null
                              from KM3Null in Kmodel3Null.DefaultIfEmpty()


                              join product4 in db.Products on order.ProductId4 equals product4.Id
                               into product4Null
                              from Pro4Null in product4Null.DefaultIfEmpty()

                              join model4 in db.tblModels on order.ModelId4 equals model4.Id
                               into model4Null
                              from mdl4Null in model4Null.DefaultIfEmpty()

                              join kartela4 in db.Kartelas on order.KartelaId4 equals kartela4.Id
                              into kartela4Null
                              from K4Null in kartela4Null.DefaultIfEmpty()


                              join kartelaModel4 in db.KartelaProducts on order.KartelaModelId4 equals kartelaModel4.Id
                                       into Kmodel4Null
                              from KM4Null in Kmodel4Null.DefaultIfEmpty()

                              where order.Id == Id

                              select new OrderCustomerProduct
                              {
                                  Id = order.Id,
                                  CustomerId = (CCNull.Id== null) ? 9999 : CCNull.Id,
                                  //KartelaProductName4 =  (KM4Null.ProductName == null) ? "N/A" : KM4Null.ProductName,
                                  ProductId = (ppNull.Id == null) ? 9999 : ppNull.Id,
                                  ModelId = (mdlNull.Id == null) ? 9999 : mdlNull.Id,
                                  KartelaId = (K2Null.Id == null) ? 9999 : K2Null.Id,
                                  NameSurname = (CCNull.NameSurname == null) ? "N/A" : CCNull.NameSurname,
                                  Adress = (KM4Null.ProductName == null) ? "N/A" : KM4Null.ProductName,
                                  Phone1 = (CCNull.Phone1 == null) ? "N/A" : CCNull.Phone1,
                                  Phone2 = (CCNull.Phone2 == null) ? "N/A" : CCNull.Phone2,

                                  ProductName = (ppNull.ProductName == null) ? "N/A" : ppNull.ProductName,
                                  ModelName = (mdlNull.ModelName == null) ? "N/A" : mdlNull.ModelName,
                                  KartelaName = (KNull.KartelaName == null) ? "N/A" : KNull.KartelaName,
                                  KartelaProductName = (KMNull.ProductName == null) ? "N/A" : KM4Null.ProductName,
                                  Cila = order.Cila,
                                  Description = order.Description,

                                  ProductName2 = (ProNull.ProductName == null) ? "N/A" : ProNull.ProductName,
                                  ModelName2 = (mdl2Null.ModelName == null) ? "N/A" : mdl2Null.ModelName,
                                  KartelaName2 = (K2Null.KartelaName == null) ? "N/A" : K2Null.KartelaName,
                                  KartelaProductName2 = (KM2Null.ProductName == null) ? "N/A" : KM2Null.ProductName,
                                  Cila2 = order.Cila2,
                                  Description2 = order.Description2,

                                  ProductName3 = (Pro3Null.ProductName == null) ? "N/A" : Pro3Null.ProductName,
                                  ModelName3 = (mdl3Null.ModelName == null) ? "N/A" : mdl3Null.ModelName,
                                  KartelaName3 = (K3Null.KartelaName == null) ? "N/A" : K3Null.KartelaName,
                                  KartelaProductName3 = (KM3Null.ProductName == null) ? "N/A" : KM3Null.ProductName,
                                  Cila3 = order.Cila3,
                                  Description3 = order.Description3,

                                  ProductName4 = (Pro4Null.ProductName == null) ? "N/A" : Pro4Null.ProductName,
                                  ModelName4 = (mdl4Null.ModelName == null) ? "N/A" : mdl4Null.ModelName,
                                  KartelaName4 = (K4Null.KartelaName == null) ? "N/A" : K4Null.KartelaName,
                                  KartelaProductName4 = (KM4Null.ProductName == null) ? "N/A" : KM4Null.ProductName,
                                  Cila4 = order.Cila4,
                                  Description4 = order.Description4
                              }
                            ).ToList();
                return detail;
                #endregion

            }
        }


    }
}