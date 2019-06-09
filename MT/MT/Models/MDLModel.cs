using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MT.Models.Types;

namespace MT.Models
{
    public class MDLModel
    {
        public static int Add(tblModel model)
        {
            try
            {
                using (var db = new MTSEntities())
                {
                    var temp = new tblModel
                    {
                        ProductId = model.ProductId,
                        ModelName = model.ModelName
                    };
                    db.tblModels.Add(temp);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public static List<ModelProduct> List()
        {
            using (var db = new MTSEntities())
            {
                var models = (from x in db.tblModels
                              join p in db.Products on x.ProductId equals p.Id
                              select new ModelProduct
                              {
                                  ProductName = p.ProductName,
                                  Id = x.Id,
                                  ProductId = p.Id,
                                  ModelName = x.ModelName
                              }
                            ).ToList();
                return models;

            }
        }
        public static List<tblModel> Edit(int Id)
        {
            using (var db = new MTSEntities())
            {
                var model = (from x in db.tblModels where x.Id == Id select x).ToList();
                return model;
            }
        }
        public static int Update(tblModel model)
        {
            try
            {
                using (var db = new MTSEntities())
                {
                    tblModel temp = db.tblModels.SingleOrDefault(x => x.Id == model.Id);
                    temp.ModelName = model.ModelName;
                    temp.ProductId = model.ProductId;
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
                using (var db = new MTSEntities())
                {
                    var tempRemove = db.tblModels.SingleOrDefault(x => x.Id == Id);
                    if (tempRemove != null)
                    {
                        db.tblModels.Remove(tempRemove);
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

        public static List<tblModel> ProductForModel(int ProductId)
        {
            using (var db = new MTSEntities())
            {
                var productForModel = (from x in db.tblModels where x.ProductId == ProductId select x).ToList();
                return productForModel;
            }
        }
    }
}