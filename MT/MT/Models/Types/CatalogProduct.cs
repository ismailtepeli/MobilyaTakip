using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MT.Models.Types
{
    public class CatalogProduct
    {
        public int Id { get; set; }
        public int KartelaId { get; set; }
        public string KartelaName { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
    }
}