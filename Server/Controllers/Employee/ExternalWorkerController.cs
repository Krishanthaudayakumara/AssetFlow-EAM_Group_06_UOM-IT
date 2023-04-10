using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExternalWorkerController : ControllerBase
    {
        private readonly DataContext _context;

        public ExternalWorkerController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ExternalWorker
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExternalWorker>>> GetExternalWorkers()
        {
            return await _context.ExternalWorkers.ToListAsync();
        }

        // GET: api/ExternalWorker/5
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

        // PUT: api/ExternalWorker/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExternalWorker(int id, ExternalWorkerDto externalWorkerDto)
        {
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

        // POST: api/ExternalWorker
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

        // DELETE: api/ExternalWorker/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExternalWorker>> DeleteExternalWorker(int id)
        {
            var externalWorker = await _context.ExternalWorkers.FindAsync(id);
            if (externalWorker == null)
            {
                return NotFound();
            }

            _context.ExternalWorkers.Remove(externalWorker);
            await _context.SaveChangesAsync();

            return externalWorker;
        }

        private bool ExternalWorkerExists(int id)
        {
            return _context.ExternalWorkers.Any(e => e.Id == id);
        }
    }

}