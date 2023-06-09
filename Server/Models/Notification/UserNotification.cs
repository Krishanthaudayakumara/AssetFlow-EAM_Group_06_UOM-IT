namespace Server.Models
{
    public class UserNotification
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
        public int NotificationId { get; set; }
        public Notification Notification { get; set; }
        public bool IsRead { get; set; }


    }
}
