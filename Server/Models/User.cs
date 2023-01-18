namespace Server.Models
{
    public class User
    {

        public int id { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

    }
}