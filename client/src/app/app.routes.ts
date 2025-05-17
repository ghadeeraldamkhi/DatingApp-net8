import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { FailedResponseComponent } from './responseMessages/failed-response/failed-response.component';
import { SuccessResponseComponent } from './responseMessages/success-response/success-response.component';
import { SuccessRegisterComponent } from './responseMessages/success-register/success-register.component';
import { FailedRegisterComponent } from './responseMessages/failed-register/failed-register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'app-customer-details', component: CustomerDetailsComponent},
    { path: 'app-customer-update/:idParam', component: CustomerUpdateComponent },
    {path: 'app-customer-lists', component: CustomerListComponent},
    {path: 'app-user-lists', component: UserListComponent},
    {path: 'app-add-customer', component: AddCustomerComponent},
    {path: 'responseMessage/failedResponse', component: FailedResponseComponent},
    {path: 'responseMessage/successResponse', component: SuccessResponseComponent},
    {path: 'responseMessage/successRegisterResponse', component: SuccessRegisterComponent},
    {path: 'responseMessage/failedRegisterResponse', component: FailedRegisterComponent},
    {path: '**', component: HomeComponent, pathMatch: 'full'}
];
