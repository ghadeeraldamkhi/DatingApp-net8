import { Component, inject, OnInit } from '@angular/core';
import { CustomersService } from '../_services/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{
  private customersService = inject(CustomersService);
  customers: any;
  private router = inject(Router);

  ngOnInit(): void {
    this.customersService.customers().subscribe({
      next: response => this.customers = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  editCustomer(model: number){
    console.log('inside edit customer '+model);
    this.router.navigateByUrl("/app-customer-update/"+model);

  }

}
