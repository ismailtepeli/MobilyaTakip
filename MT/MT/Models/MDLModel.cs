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
                using (var db=new MTSEntities())
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
    }
}