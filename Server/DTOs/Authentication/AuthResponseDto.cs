using System;
using System.ComponentModel.DataAnnotations;
using Server.DTOs;

namespace Server.Dtos
{
    public class AuthResponseDto
{
    public string Token { get; set; }
    public UserDto User { get; set; }
    public DateTime Expiration { get; set; }
    public string Message { get; set; }
    public bool IsSuccess { get; set; }
}


}
