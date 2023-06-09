using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Server.DTOs
{
   public class EmployeeRequestDTO
{
    public int EmployeeId { get; set; }
    public int AssetId { get; set; }    
}

}