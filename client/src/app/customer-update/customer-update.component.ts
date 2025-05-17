import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerActionService } from '../_services/customer-action.service';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../_services/customers.service';

interface CustomerResponse {
  customerName: string;
  customerNum: string;
  gender: string;
  dateOfBirth: string;
}

@Component({
  selector: 'app-customer-update',
  imports: [FormsModule],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {
  private customerActionService = inject(CustomerActionService);
  private customersService = inject(CustomersService);

  model: any = {};
  showForm = true;
  validationErrors: string[] = [];
  successMessage: string[] = [];
  // customer: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('idParam');
      console.log('Received id:', idParam);
      const id = idParam ? Number(idParam) : 0;
      this.findCustomer(id);
    });


  }

  findCustomer(findById: number) {
    console.log("isnide findCustomer from update " + findById);
    this.validationErrors = [];


    this.customersService.customerById(findById).subscribe({
      next: response => {
        console.log(response);

        const res = response as CustomerResponse;

        this.model = res;

        const isoString = this.model.dateOfBirth;
        this.model.dateofbirth = isoString.split('T')[0]

        console.log(this.model.dateofbirth);
      },
      error: error => {
        console.log(error);
      }
    })

  }

  updateCustomer() {
    console.log("isnide updateCustomer " + this.model);
    this.validationErrors = [];
    this.successMessage = [];

    this.customerActionService.updateCustomer(this.model.id, this.model).subscribe({
      next: response => {
        const res = response as CustomerResponse;
        console.log(response);
        this.successMessage.push("You have successfully updated an existing customer:");
        this.successMessage.push("Customer Name: " + res.customerName);
        this.successMessage.push("Customer Number: " + res.customerNum);
        this.successMessage.push("Gender: " + res.gender);
        this.successMessage.push("Date of Birth: " + res.dateOfBirth);
        this.showForm = false
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
