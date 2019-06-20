using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MT.Models.Types
{
    public class OrderCustomerProduct
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string StartDate { get; set; }
        public string FinishDate { get; set; }
        public int? ProductId { get; set; }
        public int? ModelId { get; set; }
        public int? KartelaId { get; set; }
        public int? KartelaModelId { get; set; }
        public string Cila { get; set; }
        public string Description { get; set; }
        public double? TotalPrice { get; set; }
        public double? KaporaPrice { get; set; }
        public string KaporaType { get; set; }
        public string PaymentType { get; set; }

        public int? ProductId2 { get; set; }
        public int? ModelId2 { get; set; }
        public int? KartelaModelId2 { get; set; }
        
        public string Description2 { get; set; }

        public int? ProductId3 { get; set; }
        public int? ModelId3 { get; set; }
        public int? KartelaModelId3 { get; set; }
        public string Cila3 { get; set; }
        public string Description3 { get; set; }

        public int? ProductId4 { get; set; }
        public int? ModelId4 { get; set; }
        public int? KartelaModelId4 { get; set; }
        public string Cila4 { get; set; }
        public string Description4 { get; set; }

        public string NameSurname { get; set; }
        public string Email { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Adress { get; set; }


        public string KartelaName { get; set; }

        public string KartelaProductName { get; set; }
        public string ProductCode { get; set; }


        public string ProductName { get; set; }
        public string ModelName { get; set; }

        public string ProductName2 { get; set; }
        public string ModelName2 { get; set; }
        public string KartelaName2 { get; set; }
        public string KartelaProductName2 { get; set; }
        public string Cila2 { get; set; }

        public string ProductName3 { get; set; }
        public string ModelName3 { get; set; }
        public string KartelaName3 { get; set; }
        public string KartelaProductName3 { get; set; }

        public string ProductName4 { get; set; }
        public string ModelName4 { get; set; }
        public string KartelaName4 { get; set; }
        public string KartelaProductName4 { get; set; }


        public int? KartelaId2 { get; set; }
        public int? KartelaId3 { get; set; }
        public int? KartelaId4 { get; set; }

    }
}