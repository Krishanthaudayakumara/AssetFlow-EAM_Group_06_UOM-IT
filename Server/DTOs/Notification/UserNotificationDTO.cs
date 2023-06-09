namespace Server.DTOs
{
    public class UserNotificationDTO
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public int NotificationId { get; set; }
        public bool IsRead { get; set; }
    }
}
