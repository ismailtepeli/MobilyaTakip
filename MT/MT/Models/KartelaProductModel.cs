﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MT.Models.Types;
namespace MT.Models
{
    public class KartelaProductModel
    {
        public static int Add(KartelaProduct kp)
        {
            try
            {
                using (var db = new MTSEntities())
                {
                    var item = new KartelaProduct
                    {
                        KartelaId = kp.KartelaId,
                        ProductName = kp.ProductName,
                        ProductCode = kp.ProductCode
                    };
                    db.KartelaProduct.Add(item);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static List<CatalogProduct> List()
        {
            using (var db = new MTSEntities())
            {
                var kp = (from x in db.KartelaProduct
                          join k in db.Kartela on x.KartelaId equals k.Id
                          select new CatalogProduct
                          {
                              ProductName = x.ProductName,
                              Id = x.Id,
                              KartelaId = k.Id,
                              KartelaName = k.KartelaName,
                              ProductCode = x.ProductName
                          }).ToList();
                return kp;
            }
        }

        public static List<KartelaProduct> Edit(int Id)
        {
            using (var db = new MTSEntities())
            {
                var model = (from x in db.KartelaProduct where x.Id == Id select x).ToList();
                return model;
            }
        }

        public static int Update(KartelaProduct kp)
        {
            try
            {
                using (var db = new MTSEntities())
                {
                    KartelaProduct temp = db.KartelaProduct.SingleOrDefault(x => x.Id == kp.Id);
                    temp.KartelaId = kp.KartelaId;
                    temp.ProductName = kp.ProductName;
                    temp.ProductCode = kp.ProductCode;
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
                    var tempToRemove = db.KartelaProduct.SingleOrDefault(x => x.Id == Id);
                    if (tempToRemove!=null)
                    {
                        db.KartelaProduct.Remove(tempToRemove);
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

        public static List<KartelaProduct> KartelaForProduct(int KartelaId)
        {
            using (var db=new MTSEntities())
            {
                var kartelaForProduct = (from x in db.KartelaProduct where x.KartelaId == KartelaId select x).ToList();
                return kartelaForProduct;
            }
        }
    }
}