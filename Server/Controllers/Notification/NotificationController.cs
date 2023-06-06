using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Server.Controllers
{
    // [Authorize] // Use authorization attribute based on your requirements
    [ApiController]
    [Route("api/notifications")]
    public class NotificationController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public NotificationController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public ActionResult<IEnumerable<NotificationDTO>> GetNotifications()
        {
            // Get current user
            var user = _userManager.GetUserAsync(User).Result;

            if (user == null)
            {
                return Unauthorized(); // Return 401 Unauthorized if user is not authenticated
            }
            
            // Get notifications and read status for the user
            var notifications = _context.Notifications.Select(n => new NotificationDTO
            {
                Id = n.Id,
                Title = n.Title,
                Message = n.Message,
                ImageUrl = n.ImageUrl,
                CreatedAt = n.CreatedAt,
                IsRead = _context.UserNotifications.Any(un => un.UserId == user.Id && un.NotificationId == n.Id && un.IsRead)
            }).ToList();

            return notifications;
        }

        [HttpPost]
        public ActionResult CreateNotification(NotificationDTO notificationDTO)
        {
            // Create notification
            var notification = new Notification
            {
                Title = notificationDTO.Title,
                Message = notificationDTO.Message,
                ImageUrl = notificationDTO.ImageUrl,
                CreatedAt = DateTime.Now,
                UserNotifications = new List<UserNotification>()
            };

            _context.Notifications.Add(notification);
            _context.SaveChanges();

            // Get all users
            var users = _userManager.Users.ToList();

            // Create UserNotification for each user
            foreach (var user in users)
            {
                var userNotification = new UserNotification
                {
                    UserId = user.Id,
                    NotificationId = notification.Id,
                    IsRead = false
                };

                notification.UserNotifications.Add(userNotification);
            }

            _context.SaveChanges();

            return Ok();
        }

        [HttpPut("{id}/read")]
        public ActionResult MarkNotificationAsRead(int id)
        {
            // Get current user
            var user = _userManager.GetUserAsync(User).Result;

            // Find UserNotification for the user and notification
            var userNotification = _context.UserNotifications.FirstOrDefault(un => un.UserId == user.Id && un.NotificationId == id);

            if (userNotification != null)
            {
                userNotification.IsRead = true;
                _context.SaveChanges();
                return Ok();
            }

            return NotFound();
        }
    }
}
