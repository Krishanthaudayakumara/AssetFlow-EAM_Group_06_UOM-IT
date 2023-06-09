using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.DTOs;
using Server.DTOs.Dashboard;

namespace Server.Controllers
{   [ApiController]
    [Route("[controller]")]
    public class MainDashboardController : ControllerBase
    {
        private readonly DataContext _context;

        public MainDashboardController(DataContext context)
        {
            _context = context;
        }
        
        [HttpGet("availableEmployeeCount")]
        public ActionResult<AvailableEmployeeCountDTO> GetAvailableEmployeeCount()
        {
            int availableEmployeeCount = _context.Employees.Count();

            AvailableEmployeeCountDTO availableEmployeeCountDTO = new AvailableEmployeeCountDTO
            {
                AvailableEmployeeCount = availableEmployeeCount
            };

            return Ok(availableEmployeeCountDTO);
        }
          [HttpGet("available-agent-count")]
        public IActionResult GetAvailableAgentCount()
        {
            var availableAgentCount =
                _context.Agents.Count(a => a.AgentStatus == "Available");

            var availableAgentCountDTO =
                new AvailableAgentCountDTO {
                    AvailableAgentCount = availableAgentCount
                };

            return Ok(availableAgentCountDTO);
        }
         [HttpGet("total-workstations")]
        public ActionResult<TotalWorkstation> GetTotalWorkstations()
        {
            int totalWorkstations = _context.Workstations.Count();
            TotalWorkstation totalWorkstationDTO = new TotalWorkstation { TotalWorkstations = totalWorkstations };
            return Ok(totalWorkstationDTO);
        }
        [HttpGet("total-facility-assets")]
        public ActionResult<TotalFacilityAsset> GetTotalFacilityAssets()
        {
            int totalFacilityAssets = _context.FacilityAssets.Count();
            TotalFacilityAsset totalFacilityAssetDTO = new TotalFacilityAsset { TotalFacilityAssets = totalFacilityAssets };
            return Ok(totalFacilityAssetDTO);
        }
        [HttpGet("employee-table")]
        public ActionResult<IEnumerable<EmployeeTableDTO>> GetEmployeeTableData()
        {
            var employees = _context.Employees;

            var employeeTableData = employees.Select(e => new EmployeeTableDTO
            {
                Username = $"{e.FirstName} {e.LastName}",
                Role = e.JobTitle,
                Department = e.Department.Name,
                Email = e.Email,
                HireDate = e.HireDate
            }).ToList();

            return Ok(employeeTableData);
        }
         [HttpGet("chartFeedback")]
        public ActionResult<FeedBackChartDTO> GetFeedbackChart()
        {
            var feedbackList = _context.Feedbacks.ToList();

            var chartData = new FeedBackChartDTO
            {
                GoodCount = feedbackList.Count(f => f.Rating == "Good"),
                BetterCount = feedbackList.Count(f => f.Rating == "Better"),
                WorstCount = feedbackList.Count(f => f.Rating == "Worst")
            };

            return chartData;
    }
       [HttpGet("subcategory-types")]
        public ActionResult<IEnumerable<SubCategoryTypeDTO>> GetSubCategoryTypesWithCount()
        {
            var subCategoryTypes = _context.SubCategories
                .GroupBy(s => s.Name)
                .Select(g => new SubCategoryTypeDTO
                {
                    SubCategoryType = g.Key,
                    Count = g.Count()
                })
                .ToList();

            return Ok(subCategoryTypes);
        }
}
}