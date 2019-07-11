using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MT.Models.Types;
namespace MT.Models
{
    public class ProductModel
    {
        public static List<Product> List()
        {
            using (var db=new MTSEntities())
            {
                var Produtcs = (from x in db.Product select x).ToList();
                return Produtcs;
            }
        }
        public static List<Product> Edit(int Id)
        {
            using (var db=new MTSEntities())
            {
                var Products = (from x in db.Product where x.Id == Id select x).ToList();
                return Products;
            }
        }
        public static int Update(Product product)
        {
            try
            {
                using (var db=new MTSEntities())
                {
                    Product temp = db.Product.SingleOrDefault(x => x.Id == product.Id);
                    temp.ProductName = product.ProductName;
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
                    var itemToRemove = db.Product.SingleOrDefault(x => x.Id == Id);
                    if (itemToRemove!=null)
                    {
                        db.Product.Remove(itemToRemove);
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
        public static int Add(Product product)
        {
            try
            {
                using (var db=new MTSEntities())
                {
                    var temp = new Product
                    {
                        ProductName = product.ProductName
                    };
                    db.Product.Add(temp);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}