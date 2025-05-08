using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; } // the property name Users is the table name which this property is linked to the AppUser Entity
    public DbSet<AppCustomer> Customers { get; set; }
}
