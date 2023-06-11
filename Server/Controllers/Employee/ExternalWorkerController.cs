using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Server.Data;
using Server.Dtos;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExternalWorkersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public ExternalWorkersController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/ExternalWorkers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExternalWorker>>> GetExternalWorkers(bool includeDeleted = false)
        {
            var query = _context.ExternalWorkers.AsQueryable();

            if (!includeDeleted)
            {
                query = query.Where(e => !e.IsDeleted);
            }

            var externalWorkers = await query.ToListAsync();
            return externalWorkers;
        }

        // GET: api/ExternalWorkers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExternalWorker>> GetExternalWorker(int id)
        {
            var externalWorker = await _context.ExternalWorkers.FindAsync(id);

            if (externalWorker == null)
            {
                return NotFound();
            }

            return externalWorker;
        }

        // GET: api/ExternalWorkers/deleted
        [HttpGet("deleted")]
        public async Task<ActionResult<IEnumerable<ExternalWorker>>> GetDeletedExternalWorkers()
        {
            var deletedExternalWorkers = await _context.ExternalWorkers.Where(e => e.IsDeleted).ToListAsync();
            return deletedExternalWorkers;
        }

        // POST: api/ExternalWorkers
        [HttpPost]
        public async Task<ActionResult<ExternalWorker>> PostExternalWorker(ExternalWorkerDto externalWorkerDto)
        {
            var externalWorker = new ExternalWorker
            {
                FirstName = externalWorkerDto.FirstName,
                LastName = externalWorkerDto.LastName,
                MiddleName = externalWorkerDto.MiddleName,
                PhoneNumber = externalWorkerDto.PhoneNumber,
                DateOfBirth = externalWorkerDto.DateOfBirth,
                HireDate = externalWorkerDto.HireDate,
                JobTitle = externalWorkerDto.JobTitle,
                DepartmentId = externalWorkerDto.DepartmentId
            };

            _context.ExternalWorkers.Add(externalWorker);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExternalWorker", new { id = externalWorker.Id }, externalWorker);
        }

        // PUT: api/ExternalWorkers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExternalWorker(int id, ExternalWorkerDto externalWorkerDto)
        {
            if (id != externalWorkerDto.Id)
            {
                return BadRequest();
            }

            var externalWorker = await _context.ExternalWorkers.FindAsync(id);
            if (externalWorker == null)
            {
                return NotFound();
            }

            externalWorker.FirstName = externalWorkerDto.FirstName;
            externalWorker.LastName = externalWorkerDto.LastName;
            externalWorker.MiddleName = externalWorkerDto.MiddleName;
            externalWorker.PhoneNumber = externalWorkerDto.PhoneNumber;
            externalWorker.DateOfBirth = externalWorkerDto.DateOfBirth;
            externalWorker.HireDate = externalWorkerDto.HireDate;
            externalWorker.JobTitle = externalWorkerDto.JobTitle;
            externalWorker.DepartmentId = externalWorkerDto.DepartmentId;

            _context.Entry(externalWorker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExternalWorkerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/ExternalWorkers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExternalWorker(int id)
        {
            var externalWorker = await _context.ExternalWorkers.FindAsync(id);
            if (externalWorker == null)
            {
                return NotFound();
            }

            _context.ExternalWorkers.Remove(externalWorker);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Export to Excel: api/ExternalWorkers/export
        // Export to Excel: api/ExternalWorkers/export
        [HttpGet("export")]
        public async Task<IActionResult> ExportToExcel(bool includeDeleted = false)
        {
            var query = _context.ExternalWorkers.Include(e => e.Department).AsQueryable();

            if (!includeDeleted)
            {
                query = query.Where(e => !e.IsDeleted);
            }

            var externalWorkers = await query.ToListAsync();

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("External Workers");
                var row = 1;

                // Write header row
                worksheet.Cells[row, 1].Value = "ID";
                worksheet.Cells[row, 2].Value = "First Name";
                worksheet.Cells[row, 3].Value = "Last Name";
                worksheet.Cells[row, 4].Value = "Middle Name";
                worksheet.Cells[row, 5].Value = "Phone Number";
                worksheet.Cells[row, 6].Value = "Date of Birth";
                worksheet.Cells[row, 7].Value = "Hire Date";
                worksheet.Cells[row, 8].Value = "Job Title";
                worksheet.Cells[row, 9].Value = "Department ID";
                worksheet.Cells[row, 10].Value = "Department Name";

                row++;

                // Write data rows
                foreach (var externalWorker in externalWorkers)
                {
                    worksheet.Cells[row, 1].Value = externalWorker.Id;
                    worksheet.Cells[row, 2].Value = externalWorker.FirstName;
                    worksheet.Cells[row, 3].Value = externalWorker.LastName;
                    worksheet.Cells[row, 4].Value = externalWorker.MiddleName;
                    worksheet.Cells[row, 5].Value = externalWorker.PhoneNumber;
                    worksheet.Cells[row, 6].Value = externalWorker.DateOfBirth.ToString("yyyy-MM-dd");
                    worksheet.Cells[row, 7].Value = externalWorker.HireDate.ToString("yyyy-MM-dd");
                    worksheet.Cells[row, 8].Value = externalWorker.JobTitle;
                    worksheet.Cells[row, 9].Value = externalWorker.DepartmentId;
                    worksheet.Cells[row, 10].Value = externalWorker.Department.Name;

                    row++;
                }

                // Auto-fit columns
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                // Set content type and return Excel file
                var content = package.GetAsByteArray();
                var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                var fileName = "ExternalWorkers.xlsx";

                return File(content, contentType, fileName);
            }
        }

        // Import from Excel: api/ExternalWorkers/import
        [HttpPost("import")]
        public async Task<IActionResult> ImportFromExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Read the Excel file
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets.FirstOrDefault();
                    if (worksheet == null)
                    {
                        return BadRequest("No worksheet found in the Excel file.");
                    }

                    var rowCount = worksheet.Dimension.Rows;
                    if (rowCount < 2)
                    {
                        return BadRequest("The Excel file must contain at least one data row.");
                    }

                    var externalWorkers = new List<ExternalWorker>();

                    // Read data rows
                    for (int row = 2; row <= rowCount; row++)
                    {
                        var externalWorkerDto = new ExternalWorkerDto
                        {
                            FirstName = worksheet.Cells[row, 1].GetValue<string>(),
                            LastName = worksheet.Cells[row, 2].GetValue<string>(),
                            MiddleName = worksheet.Cells[row, 3].GetValue<string>(),
                            PhoneNumber = worksheet.Cells[row, 4].GetValue<string>(),
                            DateOfBirth = worksheet.Cells[row, 5].GetValue<DateTime>(),
                            HireDate = worksheet.Cells[row, 6].GetValue<DateTime>(),
                            JobTitle = worksheet.Cells[row, 7].GetValue<string>(),
                            DepartmentId = worksheet.Cells[row, 8].GetValue<int>()
                        };

                        var externalWorker = new ExternalWorker
                        {
                            FirstName = externalWorkerDto.FirstName,
                            LastName = externalWorkerDto.LastName,
                            MiddleName = externalWorkerDto.MiddleName,
                            PhoneNumber = externalWorkerDto.PhoneNumber,
                            DateOfBirth = externalWorkerDto.DateOfBirth,
                            HireDate = externalWorkerDto.HireDate,
                            JobTitle = externalWorkerDto.JobTitle,
                            DepartmentId = externalWorkerDto.DepartmentId
                        };

                        externalWorkers.Add(externalWorker);
                    }

                    // Save the external workers to the database
                    _context.ExternalWorkers.AddRange(externalWorkers);
                    await _context.SaveChangesAsync();

                    return Ok($"Imported {externalWorkers.Count} external workers from the Excel file.");
                }
            }
        }

        private bool ExternalWorkerExists(int id)
        {
            return _context.ExternalWorkers.Any(e => e.Id == id);
        }

        // Download sample Excel file: api/ExternalWorkers/sample
        [HttpGet("sample")]
        public IActionResult DownloadSampleExcel()
        {
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Sample External Workers");
                var row = 1;

                // Write header row
                worksheet.Cells[row, 1].Value = "First Name";
                worksheet.Cells[row, 2].Value = "Last Name";
                worksheet.Cells[row, 3].Value = "Middle Name";
                worksheet.Cells[row, 4].Value = "Phone Number";
                worksheet.Cells[row, 5].Value = "Date of Birth";
                worksheet.Cells[row, 6].Value = "Hire Date";
                worksheet.Cells[row, 7].Value = "Job Title";
                worksheet.Cells[row, 8].Value = "Department ID";

                // Generate dummy data
                var random = new Random();
                var rowCount = 10;
                for (int i = 0; i < rowCount; i++)
                {
                    row++;
                    worksheet.Cells[row, 1].Value = "FirstName" + (i + 1);
                    worksheet.Cells[row, 2].Value = "LastName" + (i + 1);
                    worksheet.Cells[row, 3].Value = "MiddleName" + (i + 1);
                    worksheet.Cells[row, 4].Value = "Phone" + (i + 1);
                    worksheet.Cells[row, 5].Value = DateTime.Now.AddYears(-random.Next(20, 40)).ToString("yyyy-MM-dd");
                    worksheet.Cells[row, 6].Value = DateTime.Now.AddDays(-random.Next(365)).ToString("yyyy-MM-dd");
                    worksheet.Cells[row, 7].Value = "JobTitle" + (i + 1);
                    worksheet.Cells[row, 8].Value = random.Next(1, 5);
                }

                // Auto-fit columns
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                // Set content type and return Excel file
                var content = package.GetAsByteArray();
                var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                var fileName = "SampleExternalWorkers.xlsx";

                return File(content, contentType, fileName);
            }
        }

    }
}
