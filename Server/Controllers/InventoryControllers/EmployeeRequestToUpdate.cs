using System.ComponentModel.DataAnnotations;
using System;
using Server.DTOs;
using Microsoft.AspNetCore.Http;

namespace Server.DTOs
{
    public class EmployeeRequestToUpdate
    {

    // public int EmployeeId{ get; set; }

    // public int AssetId { get; set; }

    public bool? IsAccepted { get; set; }

    }

}