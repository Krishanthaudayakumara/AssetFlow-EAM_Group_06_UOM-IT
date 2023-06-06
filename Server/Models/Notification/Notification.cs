using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<UserNotification> UserNotifications { get; set; }
    }
}
