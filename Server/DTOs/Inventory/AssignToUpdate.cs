using System;
using System.Collections.Generic;

namespace Server.DTOs
{

    public class AssignToUpdate
    {
        public int EmployeeId{get;set;}
        public int AssetId{get;set;}
        public DateTime AssignTime{get;set;}
        public int ReqID{get;set;}
    }}