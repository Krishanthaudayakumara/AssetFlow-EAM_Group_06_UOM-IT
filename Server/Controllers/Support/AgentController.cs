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
        private int id;

        public AgentController(DataContext context)
        {
            _context = context;
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
        public async Task<IActionResult> AddAgent([FromBody] AgentToInsert agentToInsert)
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
                AgentStatus = agentToInsert.AgentStatus


            };
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