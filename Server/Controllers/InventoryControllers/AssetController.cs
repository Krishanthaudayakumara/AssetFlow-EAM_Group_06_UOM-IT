using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ZXing;
using ZXing.Common;
using Server.DTOs;


namespace Server.Controllers.InventoryControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private readonly DataContext _context;

        public AssetController(DataContext context)
        {
            _context = context;
        }

        // GET: api/assets/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AssetToReturn>> GetAssetById(int id)
        {
            var asset = await _context.Assets.FindAsync(id);

            if (asset == null)
            {
                return NotFound();
            }

            var assetToReturn = new AssetToReturn
            {
                Id = asset.Id,
                Barcode = asset.Barcode,
                Description = asset.Description,
                Vendor = asset.Vendor,
                Status = asset.Status,
                Condition = asset.Condition,
                WarrantyExpiration = asset.WarrantyExpiration,
                StockId = asset.StockId,
                BarcodeImageBase64 = asset.BarcodeImageBase64
            };

            return assetToReturn;
        }

        // GET: api/assets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetToReturn>>> GetAllAssets()
        {
            var assets = await _context.Assets.ToListAsync();

            var assetsToReturn = assets.Select(asset => new AssetToReturn
            {
                Id = asset.Id,
                Barcode = asset.Barcode,
                Description = asset.Description,
                Vendor = asset.Vendor,
                Status = asset.Status,
                Condition = asset.Condition,
                WarrantyExpiration = asset.WarrantyExpiration,
                StockId = asset.StockId,
                BarcodeImageBase64 = asset.BarcodeImageBase64
            }).ToList();

            return assetsToReturn;
        }

        // POST: api/assets
        [HttpPost]
        public async Task<ActionResult<AssetToReturn>> CreateAsset(AssetToCreate assetToCreate)
        {
            if (ModelState.IsValid)
            {
                //Generate barcode image
                var writer = new BarcodeWriterPixelData
                {
                    Format = BarcodeFormat.CODE_128,
                    Options = new EncodingOptions
                    {
                        Width = 400,
                        Height = 200
                    }
                };

                // Generate a random barcode value
                var barcodeValue = GenerateRandomBarcode();

                // Create the barcode image
                var pixelData = writer.Write(barcodeValue);

                // Convert the BarcodeWriterPixelData to a Bitmap
                using (var bitmap = new Bitmap(pixelData.Width, pixelData.Height, PixelFormat.Format32bppRgb))
                {
                    using (var ms = new MemoryStream())
                    {
                        var bitmapData = bitmap.LockBits(new Rectangle(0, 0, pixelData.Width, pixelData.Height), ImageLockMode.WriteOnly, PixelFormat.Format32bppRgb);
                        try
                        {
                            System.Runtime.InteropServices.Marshal.Copy(pixelData.Pixels, 0, bitmapData.Scan0, pixelData.Pixels.Length);
                        }
                        finally
                        {
                            bitmap.UnlockBits(bitmapData);
                        }

                        // Save the Bitmap as PNG and convert to Base64 string
                        bitmap.Save(ms, ImageFormat.Png);
                        var base64Image = Convert.ToBase64String(ms.ToArray());
                        assetToCreate.BarcodeImageBase64 = base64Image;
                    }
                }

                var asset = new Asset
                {
                    Barcode = barcodeValue,
                    Description = assetToCreate.Description,
                    Vendor = assetToCreate.Vendor,
                    Status = assetToCreate.Status,
                    Condition = assetToCreate.Condition,
                    WarrantyExpiration = assetToCreate.WarrantyExpiration,
                    StockId = assetToCreate.StockId,
                    BarcodeImageBase64 = assetToCreate.BarcodeImageBase64
                };

                _context.Assets.Add(asset);
                await _context.SaveChangesAsync();

                var assetToReturn = new AssetToReturn
                {
                    Id = asset.Id,
                    Barcode = asset.Barcode,
                    Description = asset.Description,
                    Vendor = asset.Vendor,
                    Status = asset.Status,
                    Condition = asset.Condition,
                    WarrantyExpiration = asset.WarrantyExpiration,
                    StockId = asset.StockId,
                    BarcodeImageBase64 = asset.BarcodeImageBase64
                };

                return CreatedAtAction(nameof(GetAssetById), new { id = asset.Id }, assetToReturn);
            }

            return BadRequest(ModelState);
        }

        // PUT: api/assets/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsset(int id, AssetToUpdate assetToUpdate)
        {
            if (id != assetToUpdate.Id)
            {
                return BadRequest();
            }

            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            asset.Description = assetToUpdate.Description;
            asset.Vendor = assetToUpdate.Vendor;
            asset.Status = assetToUpdate.Status;
            asset.Condition = assetToUpdate.Condition;
            asset.WarrantyExpiration = assetToUpdate.WarrantyExpiration;
            asset.StockId = assetToUpdate.StockId;

            _context.Entry(asset).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // GET: api/assets/{id}/barcode
        [HttpGet("{id}/barcode")]
        public async Task<IActionResult> DownloadBarcode(int id)
        {
            var asset = await _context.Assets.FindAsync(id);

            if (asset == null)
            {
                return NotFound();
            }

            byte[] imageData = Convert.FromBase64String(asset.BarcodeImageBase64);

            // Set the response headers to specify the content type and filename
            Response.Headers.Add("Content-Type", "image/png");
            Response.Headers.Add("Content-Disposition", $"attachment; filename=barcode_{id}.png");

            return File(imageData, "image/png");
        }

    //     // POST: api/assets/stock
    //    [HttpPost("stock")]
    //    public async Task<ActionResult<StockToReturn>> AddStock([FromBody] StockToInsert stockToInsert)
    //     {
    //         var stock = new Stock
    //         {
    //             SubCategoryId = stockToInsert.SubCategoryId,
    //             PurchasedDate = stockToInsert.PurchasedDate,
    //             Cost = stockToInsert.Cost,
    //             WarrantyExpiring = stockToInsert.WarrantyExpiring,
    //             SupplierId = stockToInsert.SupplierId,
    //             Amount = stockToInsert.Amount
    //         };

    //         _context.Stocks.Add(stock);
    //         await _context.SaveChangesAsync();

    //         // Create asset records based on the stock amount
    //         for (int i = 0; i < stock.Amount; i++)
    //         {
    //             var assetToCreate = new AssetToCreate
    //             {
    //                 Description = stockToInsert.Description,
    //                 Vendor = stockToInsert.Vendor,
    //                 Status = stockToInsert.Status,
    //                 Condition = stockToInsert.Condition,
    //                 WarrantyExpiration = stockToInsert.WarrantyExpiration,
    //                 StockId = stock.StockId
    //             };

    //             await CreateAsset(assetToCreate);
    //         }

    //         var stockToReturn = new StockToReturn
    //         {
    //             StockId = stock.StockId,
    //             SubCategoryId = stock.SubCategoryId,
    //             PurchasedDate = stock.PurchasedDate,
    //             Cost = stock.Cost,
    //             WarrantyExpiring = stock.WarrantyExpiring,
    //             SupplierId = stock.SupplierId,
    //             Amount = stock.Amount
    //         };

    //         return CreatedAtAction(nameof(GetStock), new { id = stock.StockId }, stockToReturn);
    //     }

    //     private async Task CreateAsset(AssetToCreate assetToCreate)
    //     {
    //         // Generate barcode image
    //         var writer = new BarcodeWriterPixelData
    //         {
    //             Format = BarcodeFormat.CODE_128,
    //             Options = new EncodingOptions
    //             {
    //                 Width = 400,
    //                 Height = 200
    //             }
    //         };

    //         // Generate a random barcode value
    //         var barcodeValue = GenerateRandomBarcode();

    //         // Create the barcode image
    //         var pixelData = writer.Write(barcodeValue);

    //         // Convert the BarcodeWriterPixelData to a Bitmap
    //         using (var bitmap = new Bitmap(pixelData.Width, pixelData.Height, PixelFormat.Format32bppRgb))
    //         {
    //             using (var ms = new MemoryStream())
    //             {
    //                 var bitmapData = bitmap.LockBits(new Rectangle(0, 0, pixelData.Width, pixelData.Height), ImageLockMode.WriteOnly, PixelFormat.Format32bppRgb);
    //                 try
    //                 {
    //                     System.Runtime.InteropServices.Marshal.Copy(pixelData.Pixels, 0, bitmapData.Scan0, pixelData.Pixels.Length);
    //                 }
    //                 finally
    //                 {
    //                     bitmap.UnlockBits(bitmapData);
    //                 }

    //                 // Save the Bitmap as PNG and convert to Base64 string
    //                 bitmap.Save(ms, ImageFormat.Png);
    //                 var base64Image = Convert.ToBase64String(ms.ToArray());
    //                 assetToCreate.BarcodeImageBase64 = base64Image;
    //             }
    //         }

    //         var asset = new Asset
    //         {
    //             Barcode = barcodeValue,
    //             Description = assetToCreate.Description,
    //             Vendor = assetToCreate.Vendor,
    //             Status = assetToCreate.Status,
    //             Condition = assetToCreate.Condition,
    //             WarrantyExpiration = assetToCreate.WarrantyExpiration,
    //             StockId = assetToCreate.StockId,
    //             BarcodeImageBase64 = assetToCreate.BarcodeImageBase64
    //         };

    //         _context.Assets.Add(asset);
    //         await _context.SaveChangesAsync();
    //     }


        // DELETE: api/assets/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AssetExists(int id)
        {
            return _context.Assets.Any(a => a.Id == id);
        }

        private string GenerateRandomBarcode()
        {
            // Generate a random barcode value here
            // You can use any logic to generate a random value, such as using GUID or random numbers
            // For example, generating a random 6-digit number
            var random = new Random();
            var barcodeValue = random.Next(100000, 999999).ToString();

            return barcodeValue;
        }
    }
}
