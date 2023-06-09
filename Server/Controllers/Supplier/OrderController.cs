using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _orderService.GetOrders();
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderCreateDTO orderCreateDTO)
        {
            var order = await _orderService.CreateOrder(orderCreateDTO);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderService.GetOrderById(id);
            if (order == null)
                return NotFound();

            return Ok(order);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _orderService.DeleteOrder(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("check-and-create")]
        public async Task<IActionResult> CheckAndCreateOrder()
        {
            var result = await _orderService.CheckAndCreateOrder();
            return Ok(result);
        }

        [HttpPost("{id}/approve")]
        public async Task<IActionResult> ApproveOrder(int id)
        {
            var result = await _orderService.ApproveOrder(id);
            if (!result)
                return NotFound();

            return Ok("Order approved successfully.");
        }

        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteOrder(int id)
        {
            var result = await _orderService.CompleteOrder(id);
            if (!result)
                return NotFound();

            return Ok("Order completed successfully.");
        }


    }
}
