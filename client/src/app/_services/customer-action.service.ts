import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerActionService {

  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/";

  addCustomer(model: any){
    return this.http.post(this.baseUrl+'customeractions/addcustomer', model);
  }

  updateCustomer(id: number, model: any){
    return this.http.put(this.baseUrl+'customeractions/updatecustomer/'+id, model);
  }


}
