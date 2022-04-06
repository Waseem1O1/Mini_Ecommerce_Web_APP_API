using System.ComponentModel.DataAnnotations;

namespace Mini_Ecom_APIS.Models
{
    public class carts
    {
        //public carts()
        //{
        //    this.sales = new HashSet<cartdetailss>();
        //}
        [Key]
        public int CartID { get; set; }
        public string UserID { get; set; }
        //public virtual cartdetailss cartde { get; set; }
        //public  ICollection<cartdetailss> cartdetailss { get; set; }

    }
}
