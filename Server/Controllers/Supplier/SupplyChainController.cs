// SupplyChainController
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplyChainController : ControllerBase
    {
        private readonly ISupplyChainService _supplyChainService;

        public SupplyChainController(ISupplyChainService supplyChainService)
        {
            _supplyChainService = supplyChainService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSupplyChains()
        {
            var supplyChains = await _supplyChainService.GetSupplyChains();
            return Ok(supplyChains);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplyChain(int id)
        {
            var supplyChain = await _supplyChainService.GetSupplyChain(id);
            if (supplyChain == null)
                return NotFound();

            return Ok(supplyChain);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSupplyChain(SupplyChainCreateDTO supplyChainCreateDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var supplyChain = await _supplyChainService.CreateSupplyChain(supplyChainCreateDTO);
            return Ok(supplyChain);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplyChain(int id, SupplyChainUpdateDTO supplyChainUpdateDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _supplyChainService.UpdateSupplyChain(id, supplyChainUpdateDTO);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpPut("{id}/activate")]
        public async Task<IActionResult> ActivateSupplyChain(int id)
        {
            var result = await _supplyChainService.ChangeStatus(id, "active");
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> DeactivateSupplyChain(int id)
        {
            var result = await _supplyChainService.ChangeStatus(id, "inactive");
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplyChain(int id)
        {
            var result = await _supplyChainService.DeleteSupplyChain(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
