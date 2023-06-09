using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers{
    
[ApiController]
[Route("api/[controller]")]
public class SuppliersController : ControllerBase
{
    private readonly DataContext _context;

    public SuppliersController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SupplierDto>>> GetSuppliers()
    {
        var suppliers = await _context.Suppliers.Select(s => new SupplierDto
        {
            Id = s.Id,
            Name = s.Name,
            Address = s.Address,
            ContactNumber = s.ContactNumber,
            Email = s.Email,
            Notes = s.Notes
        }).ToListAsync();

        return suppliers;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SupplierDto>> GetSupplier(int id)
    {
        var supplier = await _context.Suppliers.Where(s => s.Id == id)
            .Select(s => new SupplierDto
            {
                Id = s.Id,
                Name = s.Name,
                Address = s.Address,
                ContactNumber = s.ContactNumber,
                Email = s.Email,
                Notes = s.Notes
            }).SingleOrDefaultAsync();

        if (supplier == null)
        {
            return NotFound();
        }

        return supplier;
    }

    [HttpPost]
    public async Task<ActionResult<SupplierDto>> AddSupplier(SupplierDto supplierDto)
    {
        var supplier = new Supplier
        {
            Name = supplierDto.Name,
            Address = supplierDto.Address,
            ContactNumber = supplierDto.ContactNumber,
            Email = supplierDto.Email,
            Notes = supplierDto.Notes
        };

        _context.Suppliers.Add(supplier);
        await _context.SaveChangesAsync();

        supplierDto.Id = supplier.Id;

        return CreatedAtAction(nameof(GetSupplier), new { id = supplierDto.Id }, supplierDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateSupplier(int id, SupplierDto supplierDto)
    {
        var supplier = await _context.Suppliers.FindAsync(id);

        if (supplier == null)
        {
            return NotFound();
        }

        supplier.Name = supplierDto.Name;
        supplier.Address = supplierDto.Address;
        supplier.ContactNumber = supplierDto.ContactNumber;
        supplier.Email = supplierDto.Email;
        supplier.Notes = supplierDto.Notes;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSupplier(int id)
    {
        var supplier = await _context.Suppliers.FindAsync(id);

        if (supplier == null)
        {
            return NotFound();
        }

        _context.Suppliers.Remove(supplier);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

}