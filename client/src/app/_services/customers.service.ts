import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/";

  customers(){
    return this.http.get(this.baseUrl+'customers');
  }

  customerById(model: number)  {
    return this.http.get(this.baseUrl+'customers/findcustomer/'+ model);
  }

}
