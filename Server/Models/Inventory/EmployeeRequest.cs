using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class EmployeeRequest
    {
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        [Required]
        public int AssetId { get; set; }

        public Asset Asset { get; set; }

        public bool? IsAccepted { get; set; }
    }
}
