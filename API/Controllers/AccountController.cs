using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService): BaseApiController // this controller is to registor into database under user table
{
    [HttpPost("register")]
        // -> /api/account/register?username=sam&password=password
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) 
    {
        if(await UserExists(registerDto.Username)) return BadRequest("Username is taken !!!");
        
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto {
            Username = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    
    }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("Invalid username !!! [AccountController method login]");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        
        for(int i = 0; i< computedHash.Length; i++)
        {
            if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid pasword !!!");
        }

        // after login it is not allowed to return the user which includes the password
        // so in this case its better to return a token in a json file. JSON WEB TOKEN  JWT
        // authenticate api endpoint

        return new UserDto {
            Username = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    }


    private async Task<bool> UserExists(string username){
        return await context.Users.AnyAsync( x => x.UserName.ToLower() == username.ToLower());
    }

}
