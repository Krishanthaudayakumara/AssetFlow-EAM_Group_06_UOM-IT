using Server.DTOs;
using Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IOrderService
    {
        Task<List<OrderDTO>> GetOrders();
        Task<OrderDTO> GetOrderById(int id);
        Task<OrderDTO> CreateOrder(OrderCreateDTO orderCreateDTO);
        Task<bool> DeleteOrder(int id);
        Task<string> CheckAndCreateOrder();
        Task<bool> ApproveOrder(int id);
        Task<bool> CompleteOrder(int id);
    }
}
