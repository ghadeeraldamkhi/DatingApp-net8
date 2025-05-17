import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule,RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private accountService = inject(AccountService);
  loggedIn = false;
  registered = false;
  showLoginForm = true;
  showRegisterForm = true;

  private router = inject(Router);

  model: any = {};

  showLogin(){
    this.showLoginForm = false;
  }

  showRegister(){
    this.showRegisterForm = false;
  }

  login(){
    console.log("Login Form " + this.model);

    this.accountService.login(this.model).subscribe({
      next: response => { 
        console.log(response);
        this.loggedIn = true;
        this.router.navigateByUrl("/responseMessage/successResponse");
      },
      error: error => {
        console.log(error);
        this.router.navigateByUrl("/responseMessage/failedResponse");
      } 
    })
  }

  register(){
    console.log("Register Form " + this.model);

    this.accountService.register(this.model).subscribe({
      next: response => { 
        console.log(response);
        this.registered = true;
        this.loggedIn = true;
        this.router.navigateByUrl("/responseMessage/successRegisterResponse");
      },
      error: error => {
        console.log(error);
        this.router.navigateByUrl("/responseMessage/failedRegisterResponse");
      } 
    })
  }


  logout(){
    this.loggedIn = false;
    this.registered = false; 
    this.showLoginForm = true;
    this.showRegisterForm = true;
    this.router.navigateByUrl("");
  }

}
