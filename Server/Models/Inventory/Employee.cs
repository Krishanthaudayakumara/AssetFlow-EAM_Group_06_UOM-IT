namespace Server.Models
{
    public class Employee
    {
        public int Id { get; set; }
       
        public ICollection<Assign> Assigns { get; set; }
         public ICollection<EmployeeRequest> employeeRequests { get; set; }
        
        

        
        
    }
}