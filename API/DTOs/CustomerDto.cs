using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CustomerDto
{
    public required string CustomerName { get; set; }

    [RegularExpression(@"^\d{9}$", ErrorMessage = "Must be exactly 9 digits.")]
    public required string CustomerNum { get; set; }

    [RegularExpression("^[MFmf]$", ErrorMessage = "Gender must be either 'M' or 'F'.")]  
    public required string Gender {get; set;}

    [DataType(DataType.Date)]
    public required DateTime DateOfBirth { get; set; }
}
