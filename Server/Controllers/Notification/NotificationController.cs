using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Controllers.DTOs;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly CloudinaryService _cloudinaryService;

        public NotificationsController(DataContext context, CloudinaryService cloudinaryService)
        {
            _context = context;
            _cloudinaryService = cloudinaryService;
        }

        // GET: api/Notifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            var notifications = await _context.Notifications.ToListAsync();
            return notifications;
        }

        // POST: api/Notifications
        [HttpPost]
        public async Task<ActionResult<Notification>> CreateNotification([FromForm] CreateNotificationDto dto)
        {
            string imageUrl = null;
            if (dto.Image != null)
            {
                imageUrl = await _cloudinaryService.UploadImage(dto.Image);
            }

            var notification = new Notification
            {
                Title = dto.Title,
                Message = dto.Message,
                ImageUrl = imageUrl,
                CreatedAt = DateTime.Now
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return Ok(notification);
        }

        // PUT: api/Notifications/MarkAsRead?username=xyz
        [HttpPut("MarkAsRead")]
        public async Task<IActionResult> MarkNotificationAsRead(string username, int notificationId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userNotification = await _context.UserNotifications
                .Include(un => un.Notification)
                .FirstOrDefaultAsync(un => un.NotificationId == notificationId && un.UserId == user.Id);

            if (userNotification == null)
            {
                // Create a new user notification
                var notification = await _context.Notifications.FindAsync(notificationId);

                if (notification == null)
                {
                    return NotFound("Notification not found");
                }

                userNotification = new UserNotification
                {
                    UserId = user.Id,
                    NotificationId = notificationId,
                    IsRead = true // Assuming the newly created user notification should be marked as read
                };

                _context.UserNotifications.Add(userNotification);
            }
            else
            {
                userNotification.IsRead = true;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }




        // GET: api/UserNotifications/{username}
        [HttpGet("UserNotifications/{username}")]
        public async Task<ActionResult<IEnumerable<NotificationDTO>>> GetUserNotifications(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userNotificationIds = await _context.UserNotifications
                .Where(un => un.UserId == user.Id && un.IsRead)
                .Select(un => un.NotificationId)
                .ToListAsync();

            var notifications = await _context.Notifications
                .Select(n => new NotificationDTO
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    ImageUrl = n.ImageUrl,
                    CreatedAt = n.CreatedAt,
                    IsRead = userNotificationIds.Contains(n.Id)
                })
                .ToListAsync();

            return notifications;
        }

        // DELETE: api/Notifications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
            {
                return NotFound("Notification not found");
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
