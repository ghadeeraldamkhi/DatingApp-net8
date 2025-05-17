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

public class CustomerActionsController(DataContext context) : BaseApiController
{
    [HttpPost("addcustomer")]
    public async Task<ActionResult<CustomerDto>> AddCustomer([FromBody] CustomerDto customerDto)
    {
        if (!ModelState.IsValid)
        {
            foreach (var error in ModelState)
            {
                Console.WriteLine($"Key: {error.Key}");
                foreach (var e in error.Value.Errors)
                {
                    Console.WriteLine($" - Error: {e.ErrorMessage}");
                }
            }

            return BadRequest(ModelState);
        }

        if (await CustomerExists(customerDto.CustomerName)) return BadRequest("Customer Name is taken, it should be unique!!!");


        var cust = new AppCustomer
        {
            CustomerName = customerDto.CustomerName.ToLower(),
            CustomerNum = customerDto.CustomerNum,
            DateOfBirth = customerDto.DateOfBirth,
            Gender = customerDto.Gender.ToLower()
        };

        context.Customers.Add(cust);
        await context.SaveChangesAsync();

        return Ok(new CustomerDto
        {
            CustomerName = cust.CustomerName,
            CustomerNum = cust.CustomerNum,
            DateOfBirth = cust.DateOfBirth,
            Gender = cust.Gender
        });

    }

[HttpPut("updatecustomer/{id}")]
public async Task<ActionResult<CustomerDto>> UpdateCustomer(int id, [FromBody] CustomerDto customerDto)
{
    if (!ModelState.IsValid)
    {
        foreach (var error in ModelState)
        {
            Console.WriteLine($"Key: {error.Key}");
            foreach (var e in error.Value.Errors)
            {
                Console.WriteLine($" - Error: {e.ErrorMessage}");
            }
        }

        return BadRequest(ModelState);
    }

    var customer = await context.Customers.FindAsync(id);

    if (customer == null)
    {
        return NotFound($"Customer with ID {id} not found.");
    }


    if (await CustomerExists(customerDto.CustomerName)) return BadRequest("Customer Name is taken, it should be unique!!!");

    // Update fields
    customer.CustomerName = customerDto.CustomerName.ToLower();
    customer.CustomerNum = customerDto.CustomerNum;
    customer.DateOfBirth = customerDto.DateOfBirth;
    customer.Gender = customerDto.Gender.ToLower();

    await context.SaveChangesAsync();

    return Ok(new CustomerDto
    {
        CustomerName = customer.CustomerName,
        CustomerNum = customer.CustomerNum,
        DateOfBirth = customer.DateOfBirth,
        Gender = customer.Gender
    });
}

    private async Task<bool> CustomerExists(string customername)
    {
        return await context.Customers.AnyAsync(x => x.CustomerName.ToLower() == customername.ToLower());
    }
}
