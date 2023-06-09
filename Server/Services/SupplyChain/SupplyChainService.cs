// SupplyChainService
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class SupplyChainService : ISupplyChainService
    {
        private readonly DataContext _context;

        public SupplyChainService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<SupplyChainDTO>> GetSupplyChains()
        {
            var supplyChains = await _context.SupplyChains
                .Include(sc => sc.Supplier)
                .Include(sc => sc.SubCategory)
                .ToListAsync();

            return supplyChains.Select(sc => MapSupplyChainToDTO(sc)).ToList();
        }


        public async Task<SupplyChainDTO> GetSupplyChain(int id)
        {
            var supplyChain = await _context.SupplyChains
                .Include(sc => sc.Supplier)
                .Include(sc => sc.SubCategory)
                .FirstOrDefaultAsync(sc => sc.Id == id);

            if (supplyChain == null)
                return null;

            return MapSupplyChainToDTO(supplyChain);
        }

        public async Task<SupplyChain> CreateSupplyChain(SupplyChainCreateDTO supplyChainCreateDTO)
        {
            var supplyChain = new SupplyChain
            {
                SupplierId = supplyChainCreateDTO.SupplierId,
                AssetName = supplyChainCreateDTO.AssetName,
                SubCategoryId = supplyChainCreateDTO.SubCategoryId,
                Status = supplyChainCreateDTO.Status,
                LowQuantityThreshold = supplyChainCreateDTO.LowQuantityThreshold,
                OrderQuantity = supplyChainCreateDTO.OrderQuantity
            };

            _context.SupplyChains.Add(supplyChain);
            await _context.SaveChangesAsync();

            return supplyChain;
        }

        public async Task<bool> UpdateSupplyChain(int id, SupplyChainUpdateDTO supplyChainUpdateDTO)
        {
            var supplyChain = await _context.SupplyChains.FindAsync(id);
            if (supplyChain == null)
                return false;

            supplyChain.SupplierId = supplyChainUpdateDTO.SupplierId;
            supplyChain.AssetName = supplyChainUpdateDTO.AssetName;
            supplyChain.SubCategoryId = supplyChainUpdateDTO.SubCategoryId;
            supplyChain.Status = supplyChainUpdateDTO.Status;
            supplyChain.LowQuantityThreshold = supplyChainUpdateDTO.LowQuantityThreshold;
            supplyChain.OrderQuantity = supplyChainUpdateDTO.OrderQuantity;


            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ChangeStatus(int id, string status)
        {
            var supplyChain = await _context.SupplyChains.FindAsync(id);
            if (supplyChain == null)
                return false;

            supplyChain.Status = status;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSupplyChain(int id)
        {
            var supplyChain = await _context.SupplyChains.FindAsync(id);
            if (supplyChain == null)
                return false;

            _context.SupplyChains.Remove(supplyChain);
            await _context.SaveChangesAsync();
            return true;
        }

        private static SupplyChainDTO MapSupplyChainToDTO(SupplyChain supplyChain)
        {
            if (supplyChain == null)
            {
                return null; // or throw an exception, depending on your requirements
            }

            return new SupplyChainDTO
            {
                Id = supplyChain.Id,
                Supplier = MapSupplierToDTO(supplyChain.Supplier),
                AssetName = supplyChain.AssetName,
                SubCategory = supplyChain.SubCategory != null ? MapSubCategoryToDTO(supplyChain.SubCategory) : null,
                Status = supplyChain.Status,
                LowQuantityThreshold = supplyChain.LowQuantityThreshold,
                OrderQuantity = supplyChain.OrderQuantity,
                AssetImage = supplyChain.SubCategory?.ImageUrl // Map AssetImage property

            };
        }


        public static SupplierDto MapSupplierToDTO(Supplier supplier)
        {
            if (supplier == null)
            {
                return null; // or throw an exception, depending on your requirements
            }

            SupplierDto supplierDto = new SupplierDto
            {
                Id = supplier.Id,
                Name = supplier.Name,
                Address = supplier.Address,
                ContactNumber = supplier.ContactNumber,
                Email = supplier.Email,
                Notes = supplier.Notes
            };

            return supplierDto;
        }


        private static SubCategoryDTO MapSubCategoryToDTO(SubCategory subCategory)
        {
            return new SubCategoryDTO
            {
                Id = subCategory.Id,
                Name = subCategory.Name,
                CategoryId = subCategory.CategoryId
            };
        }

    }
}
