using System;
using System.Collections;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class CustomersController(DataContext context) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppCustomer>>> GetCustomers() 
    {
        var customers = await context.Customers.ToListAsync();
        return customers;
    }

    [HttpGet("{id:int}")]     
    public async Task<ActionResult<AppCustomer>> GetCustomers(int id) 
    {
        var customer = await context.Customers.FindAsync(id);

        if(customer == null) return NotFound();
        return customer;
    }
}
