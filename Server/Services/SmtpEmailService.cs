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
                Host = "smtp.office365.com", // Your SMTP server
                Port = 587, // Your SMTP port
                Credentials = new NetworkCredential("assetflow.me@outlook.com", "#StingPirates11"),
                EnableSsl = true
            };
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var mailMessage = new MailMessage("assetflow.me@outlook.com", email, subject, message);
            await _smtpClient.SendMailAsync(mailMessage);
        }

        public async Task SendEmailAsync(string email, string subject, string message, bool isHtml)
        {
            var mailMessage = new MailMessage("assetflow.me@outlook.com", email, subject, message)
            {
                IsBodyHtml = isHtml
            };
            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}
