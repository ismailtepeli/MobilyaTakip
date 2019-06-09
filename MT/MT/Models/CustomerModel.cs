using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MT.Models.Types;

namespace MT.Models
{
    public class CustomerModel
    {
        public static int Add(Customer customer)
        {
            try
            {
                using (var db=new MTSEntities())
                {
                    var item = new Customer
                    {
                        NameSurname = customer.NameSurname,
                        Adress=customer.Adress,
                        Email=customer.Email,
                        Phone1=customer.Phone1,
                        Phone2=customer.Phone2
                    };
                    db.Customers.Add(item);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static List<Customer> List()
        {
            using (var db=new MTSEntities())
            {
                var customers = (from x in db.Customers select x).ToList();
                return customers;
            }
        }
    }
}