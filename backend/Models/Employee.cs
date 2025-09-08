using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementCRUD.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Email { get; set; }
        public string Department { get; set; }
        public decimal Salary { get; set; }
    }
}
