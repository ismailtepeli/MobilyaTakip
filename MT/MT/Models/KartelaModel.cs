using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MT.Models.Types;

namespace MT.Models
{
    public class KartelaModel
    {
        public static int Add(Kartela kartela)
        {
            try
            {
                using (var db=new MTSEntities())
                {
                    var item = new Kartela
                    {
                        KartelaName = kartela.KartelaName
                    };
                    db.Kartelas.Add(item);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public static List<Kartela> List()
        {
            using (var db=new MTSEntities())
            {
                var kartela = (from x in db.Kartelas select x).ToList();
                return kartela;
            }
        }
        public static List<Kartela> Edit(int Id)
        {
            using (var db=new MTSEntities())
            {
                var kartela = (from x in db.Kartelas where x.Id == Id select x).ToList();
                return kartela;
            }
        }

        public static int Update(Kartela kartela)
        {
            try
            {
                using (var db=new MTSEntities())
                {
                    var item = db.Kartelas.SingleOrDefault(x => x.Id == kartela.Id);
                    item.KartelaName = kartela.KartelaName;
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
                    var item = db.Kartelas.SingleOrDefault(x => x.Id == Id);
                    if (item!=null)
                    {
                        db.Kartelas.Remove(item);
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
    }
}