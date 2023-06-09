// ISupplyChainService
using Server.DTOs;
using Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface ISupplyChainService
    {
        Task<List<SupplyChainDTO>> GetSupplyChains();
        Task<SupplyChainDTO> GetSupplyChain(int id);
        Task<SupplyChain> CreateSupplyChain(SupplyChainCreateDTO supplyChainCreateDTO);
        Task<bool> UpdateSupplyChain(int id, SupplyChainUpdateDTO supplyChainUpdateDTO);
        Task<bool> ChangeStatus(int id, string status);
        Task<bool> DeleteSupplyChain(int id);
    }
}
