using System;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; } // this is the primary key that will be used of the Users database
    public required string UserName { get; set; }
    public required byte[]  PasswordHash { get; set; }
    public required byte[]  PasswordSalt { get; set; }
}
