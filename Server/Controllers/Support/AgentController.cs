using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Support;
using Server.Models.Support;

namespace Server.Controllers.Support
{
    [ApiController]
    [Route("Api/[controller]")]
    public class AgentController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment WebHostEnvironment;


        public AgentController(DataContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            WebHostEnvironment = webHostEnvironment;
        }

        [HttpGet]

        public async Task<IActionResult> GetAllAgents()
        {
            var allAgents = await _context.Agents.ToListAsync();
            return Ok(allAgents);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAgent(int id)
        {
            var agent = await _context.Agents.FirstOrDefaultAsync(x => x.Id == id);

            if (agent is null)
            {
                return NotFound();
            }

            var agentToReturn = new AgentToReturn
            {
                Id = agent.Id,
                FirstName = agent.FirstName,
                Position = agent.Position,
                Email = agent.Email,
                JoinDate = agent.JoinDate,
                TeamId = agent.TeamId,
                AgentStatus = agent.AgentStatus,
            };
            return Ok(agentToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddAgent([FromForm] AgentToInsert agentToInsert)
        {
            if (agentToInsert is null)
            {
                return BadRequest();
            }

            var agent = new Agent
            {
                FirstName = agentToInsert.FirstName,
                LastName = agentToInsert.LaststName,
                Contact = agentToInsert.Contact,
                Position = agentToInsert.Position,
                Email = agentToInsert.Email,
                JoinDate = agentToInsert.JoinDate,
                TeamId = agentToInsert.TeamId,
                AgentStatus = agentToInsert.AgentStatus,
            };

            if (agentToInsert.ProfileImage != null)
            {
                // generate a unique filename for the image
                string fileName = agentToInsert.ProfileImage.FileName ;

                // create a new directory to store the uploaded image
                string directory = Path.Combine(WebHostEnvironment.ContentRootPath, "ProfileImages");
                Directory.CreateDirectory(directory);

                // copy the uploaded image file to the new directory
                string filePath = Path.Combine(directory, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await agentToInsert.ProfileImage.CopyToAsync(stream);
                }

                // set the ProfileImage property of the Agent object to the filename of the uploaded image
                agent.ProfileImage = fileName;
            }

            try
            {
                await _context.Agents.AddAsync(agent);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                Console.Write(ex.Message);
                return StatusCode(500);
            }

            return Ok(agent);
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAgent(int id, [FromBody] AgentToUpdate agentToUpdate)
        {
            var updateAgent = await _context.Agents.FirstOrDefaultAsync(x => x.Id == id);
            if (updateAgent is null)
            {
                return NotFound();
            }

            updateAgent.FirstName = agentToUpdate.FirstName;
            updateAgent.LastName = agentToUpdate.LastName;
            updateAgent.Contact = agentToUpdate.Contact;
            updateAgent.Position = agentToUpdate.Position;
            updateAgent.Email = agentToUpdate.Email;
            updateAgent.AgentStatus = agentToUpdate.AgentStatus;
            updateAgent.TeamId = agentToUpdate.TeamId;



            try
            {
                _context.Update(updateAgent);
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

        public async Task<IActionResult> DeleteAgent(int id)
        {
            var agentDelete = await _context.Agents.FirstOrDefaultAsync(x => x.Id == id);
            if (agentDelete is null)
            {
                return NotFound();
            }

            _context.Agents.Remove(agentDelete);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}