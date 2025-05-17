import { Component, inject, OnInit } from '@angular/core';
import { CustomerActionService } from '../_services/customer-action.service';
import { FormsModule } from '@angular/forms';

interface CustomerResponse {
  customerName: string;
  customerNum: string;
  gender: string;
  dateOfBirth: string;
}

@Component({
  selector: 'app-add-customer',
  imports: [FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  private customerActionService = inject(CustomerActionService);

  model: any = {};

  validationErrors: string[] = [];
  successMessage: string[] = [];

  addCustomer() {
    console.log("isnide addCustomer " + this.model);
    this.validationErrors = [];
    this.successMessage = [];

    this.customerActionService.addCustomer(this.model).subscribe({
      next: response => {
        const res = response as CustomerResponse;
        console.log(response);
        this.successMessage.push("You have successfully added a new customer:");
        this.successMessage.push("Customer Name: " + res.customerName);
        this.successMessage.push("Customer Number: " + res.customerNum);
        this.successMessage.push("Gender: " + res.gender);
        this.successMessage.push("Date of Birth: " + res.dateOfBirth);
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
          this.validationErrors.push("Customer Name is taken, it should be unique!!!");
        }
      }
    })
  }
}

