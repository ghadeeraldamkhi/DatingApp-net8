using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class AppCustomer
{
    public int Id { get; set; } // this is the primary key that will be used of the Customers database

    public required string CustomerName { get; set; }

    [RegularExpression(@"^\d{9}$", ErrorMessage = "Must be exactly 9 digits.")]
    public required string CustomerNum { get; set; }

    [DataType(DataType.Date)]
    public required DateTime DateOfBirth { get; set; }


    [RegularExpression("^[MFmf]$", ErrorMessage = "Gender must be either 'M' or 'F'.")]  
    public required string Gender { get; set; }
}
