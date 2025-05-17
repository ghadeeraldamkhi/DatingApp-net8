import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/";

  users(){
    return this.http.get(this.baseUrl+'users');
  }

  userById(model: any){
    return this.http.get(this.baseUrl+'users/', model);
  }
}
