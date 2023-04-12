using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Assign
    {
        public int AssignId{get;set;}
        public int EmployeeId{get;set;}
        public Employee Employee { get; set; }
        public int AssetId{get;set;}
        public Asset Asset{get;set;}
        public DateTime AssignTime{get;set;}
        public int ReqID{get;set;}
        public EmployeeRequest EmployeeRequest{get;set;}


    }}