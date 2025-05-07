using System;
using System.Collections;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] // to access this controller it will be  /api/users
public class UsersController(DataContext context) : ControllerBase
{

    // create api endpoints https get request and create method to return http response to client 

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() 
    {
        // need access to database

        var users = await context.Users.ToListAsync(); // will get all users from db

        return users; // it will return ok response of the AppUser entity type
        
    }

    [HttpGet("{id:int}")] // to be used use    /api/users/1    here it will be the id of specific user
    // [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetUsers(int id) 
    {
        var user = await context.Users.FindAsync(id); // will get  specific user based on the id

        if(user == null) return NotFound();
        return user;
    }
}
