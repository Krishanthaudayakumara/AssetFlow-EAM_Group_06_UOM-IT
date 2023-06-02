using System;

namespace Server.Models
{
    public class AccessLog
    {
        public int Id { get; set; }
        public DateTime AccessTime { get; set; }
        public string IPAddress { get; set; }
        // Add additional properties if needed, such as device information, location, etc.
        // ...
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
