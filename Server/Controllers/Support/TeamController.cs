using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Support;
using Server.Models.Support;

namespace Server.Controllers.Support
{
    [ApiController]
    [Route("Api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment WebHostEnvironment;
        public TeamController(DataContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
             WebHostEnvironment = webHostEnvironment;

        }

        /*[HttpGet("{search}")]

         public async Task<IActionResult<IEnumerable<Team>>> SearchTeam(string searchTerm)
         {
            if(string.IsNullOrEmpty(searchTerm)){
                return 
            }
         }*/

        [HttpGet]
        public async Task<IActionResult> GetAllTeams()
        {
            var allTeams = await _context.Teams.ToListAsync();
            return Ok(allTeams);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeam(int id)
        {
            var team = await _context.Teams.Include(x => x.Agents).FirstOrDefaultAsync(x => x.Id == id);

            if (team is null)
            {
                return NotFound();
            }


            return Ok(team);
        }

        [HttpPost]
        public async Task<IActionResult> AddTeam([FromForm] TeamToInsert teamToInsert)
        {
            if (teamToInsert is null)
            {
                return BadRequest();
            }
            var tm = new Team
            {
                Name = teamToInsert.Name,
                Description = teamToInsert.Description,
                IssueTypeId = teamToInsert.IssueTypeId

            };
            if (teamToInsert.ProfileImage != null){
                
                string fileName = teamToInsert.ProfileImage.FileName ;
                string directory = Path.Combine(WebHostEnvironment.ContentRootPath, "ProfileImages");
                Directory.CreateDirectory(directory);
                string filePath = Path.Combine(directory, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await teamToInsert.ProfileImage.CopyToAsync(stream);
                }
                tm.ProfileImage = fileName;
            }
            try
            {
                await _context.Teams.AddAsync(tm);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);
            }
            return Ok(tm);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateTeam(int id, [FromBody] TeamToUpdate teamToUpdate)
        {
            var updateTeam = await _context.Teams.FirstOrDefaultAsync(x => x.Id == id);
            if (updateTeam is null)
            {
                return NotFound();
            }
            updateTeam.Name = teamToUpdate.Name;
            updateTeam.Description = teamToUpdate.Description;
            updateTeam.IssueTypeId = teamToUpdate.IssueTypeId;

            try
            {
                _context.Update(updateTeam);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);

            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var deleteTeam = await _context.Teams.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteTeam is null)
            {
                return NotFound();
            }
            _context.Teams.Remove(deleteTeam);
            await _context.SaveChangesAsync();

            return Ok();

        }

    }

}