using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MT.Models.Types
{
    public class ModelProduct
    {
        public int Id { get; set; }
        public int ProductId  { get; set; }
        public string ModelName { get; set; }
        public string ProductName { get; set; }
    }
}