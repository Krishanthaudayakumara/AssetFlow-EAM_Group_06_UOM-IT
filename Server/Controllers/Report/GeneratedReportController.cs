using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Report;
using Server.Models;

namespace Server.Controllers.Report
{   [ApiController]
    [Route("api/[controller]")]
    public class GeneratedReportController : ControllerBase
    {  private readonly DataContext _context;
        private object await_context;

        public GeneratedReportController(DataContext context)
        {
            _context = context;
        }
        
    
    [HttpPost]  
     public async  Task<IActionResult> AddReportHistory([FromBody] GeneratedReportInsert generatedReportInsert) {

        if(generatedReportInsert is null){

            return BadRequest();
        }
        var generatedreport = new GeneratedReport{
            Date = generatedReportInsert.Date,
            ReportName = generatedReportInsert.ReportName,
            ReportType = generatedReportInsert.ReportType,
            ReportFormat = generatedReportInsert.ReportFormat,
            GeneratedBy = generatedReportInsert.GeneratedBy,
            Note = generatedReportInsert.Note,


        };
        try{

            await _context.GeneratedReports.AddAsync(generatedreport);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {
            Console.Write(ex.Message);
            return StatusCode(500);
        }
        return Ok(generatedreport);

     }
  
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GeneratedReportToReturn>>> GetGeneratedReports()
    {
        var generatedReports = await _context.GeneratedReports.ToListAsync();

        var generatedReportsToReturn = generatedReports.Select(generatedReport => new GeneratedReportToReturn
        {
            Id = generatedReport.Id,
            Date = generatedReport.Date,
            ReportName = generatedReport.ReportName,
            ReportType = generatedReport.ReportType,
            ReportFormat = generatedReport.ReportFormat,
            GeneratedBy = generatedReport.GeneratedBy,
            Note = generatedReport.Note
        }).ToList();

        return generatedReportsToReturn;
    }


    [HttpDelete("{id}")]
    public async  Task<IActionResult> DeleteReportHistory(int id){

        var generatedreportDelete =  await _context.GeneratedReports.FirstOrDefaultAsync(x => x.Id == id); 
        if(generatedreportDelete is null){

            return NotFound();
        }

        _context.GeneratedReports.Remove(generatedreportDelete);
        await _context.SaveChangesAsync();

        return Ok();



    }


}
}


    
    
    
 

