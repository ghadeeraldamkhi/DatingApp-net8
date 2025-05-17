import { Component, inject, OnInit } from '@angular/core';
import { CustomersService } from '../_services/customers.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  imports: [FormsModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  private customersService = inject(CustomersService);

  custId: number = 0;

  customers: any;


  validationErrors: string[] = [];

  findCustomer(){
    console.log("isnide findCustomer " +this.custId);
    this.validationErrors = [];

    
    this.customersService.customerById(this.custId).subscribe({
      next: response => { 
        console.log(response);
        this.customers = response;

      },
      error: error => {
        console.log(error);

          if (error.status === 400 && error.error?.errors) {
            const errors = error.error.errors;
            for (const field in errors) {
              if (errors.hasOwnProperty(field)) {
                this.validationErrors.push(...errors[field]);
              }
            }
          } else {
            this.validationErrors.push("Customer does not exist");
          }
        
      } 
    })

    
  }

}
