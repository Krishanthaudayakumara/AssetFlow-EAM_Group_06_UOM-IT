using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly DataContext _context;
        private readonly IEmailService _emailService;

        public OrderService(DataContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<List<OrderDTO>> GetOrders()
        {
            var orders = await _context.Orders.ToListAsync();
            return orders.Select(order => MapOrderToDTO(order)).ToList();
        }

        public async Task<OrderDTO> GetOrderById(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return null;

            return MapOrderToDTO(order);
        }

        public async Task<string> CheckAndCreateOrder()
        {
            var supplyChains = await _context.SupplyChains
                .Include(sc => sc.Supplier)
                .Where(sc => sc.Status == "active") // Only consider active supply chains
                .ToListAsync();

            foreach (var supplyChain in supplyChains)
            {
                var inStockCount = await _context.Assets
                    .Where(a => a.Status == "in stock" && a.Name == supplyChain.AssetName)
                    .CountAsync();

                if (inStockCount < supplyChain.LowQuantityThreshold)
                {
                    // Check if there is already a pending order for this supply chain
                    var existingOrder = await _context.Orders
                        .FirstOrDefaultAsync(o => o.SupplyChainId == supplyChain.Id && o.IsCompleted == false);

                    if (existingOrder == null)
                    {
                        var order = new Order
                        {
                            SupplyChainId = supplyChain.Id,
                            Quantity = supplyChain.OrderQuantity,
                            Status = "pending",
                            IsCompleted = false
                        };

                        _context.Orders.Add(order);
                        await _context.SaveChangesAsync();

                        if (supplyChain.Supplier != null)
                        {
                            return $"Sending email to  {supplyChain.Supplier.Email}";
                            await _emailService.SendEmailAsync(supplyChain.Supplier.Email, "New Order", order.Quantity.ToString(), false);
                        }
                        else
                        {
                            return $"Supplier is null {supplyChain.Supplier}";
                        }
                    }
                    else
                    {
                        return $"An order is already pending for Supply Chain ID: {supplyChain.Id}";
                    }
                }
            }

            return "Orders checked and created successfully";
        }

        public async Task<bool> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ApproveOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null || order.Status != "pending")
                return false;

            order.Status = "approved";
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CompleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null || order.Status == "completed")
                return false;

            order.Status = "completed";
            order.IsCompleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        private static OrderDTO MapOrderToDTO(Order order)
        {
            return new OrderDTO
            {
                Id = order.Id,
                SupplyChainId = order.SupplyChainId,
                Quantity = order.Quantity,
                Status = order.Status,
                IsCompleted = order.IsCompleted
            };
        }

        public Task<OrderDTO> CreateOrder(OrderCreateDTO orderCreateDTO)
        {
            throw new NotImplementedException();
        }
    }
}
