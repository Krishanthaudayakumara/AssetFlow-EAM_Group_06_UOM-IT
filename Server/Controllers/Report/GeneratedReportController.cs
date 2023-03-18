using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Report;
using Server.Models.Report;

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
    [HttpGet("{id}")]
    public async  Task<IActionResult> GetGeneratedReport(int id){

        var generatedreport =  await _context.GeneratedReports.FirstOrDefaultAsync(x => x.Id == id);

        if(generatedreport is null){

            return NotFound();
        }

        var generatedReportToreturn = new GeneratedReportToReturn{

            Id = generatedreport.Id,
            Date = generatedreport.Date,
            ReportName = generatedreport.ReportName,
            ReportType = generatedreport.ReportType,
            ReportFormat = generatedreport.ReportFormat,
            GeneratedBy = generatedreport.GeneratedBy,
            Note = generatedreport.Note,


        };
        
        return Ok(generatedReportToreturn);

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


    
    
    
 

