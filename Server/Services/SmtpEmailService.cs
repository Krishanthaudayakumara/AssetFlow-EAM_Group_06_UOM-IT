using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Server.Services
{
    public class SmtpEmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;

        public SmtpEmailService()
        {
            _smtpClient = new SmtpClient
            {
                Host = "smtp.gmail.com", // Your SMTP server
                Port = 587, // Your SMTP port
                Credentials = new NetworkCredential("vidathamarasekara99@gmail.com", "ijcjdwrjyuynxiir"),
                EnableSsl = false
            };
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var mailMessage = new MailMessage("vidathamarasekara99@gmail.com", email, subject, message);
            await _smtpClient.SendMailAsync(mailMessage);
        }

        public async Task SendEmailAsync(string email, string subject, string message, bool isHtml)
        {
            var mailMessage = new MailMessage("vidathamarasekara99@gmail.com", email, subject, message)
            {
                IsBodyHtml = isHtml
            };
            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}