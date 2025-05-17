import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  private usersService = inject(UsersService);
  users: any;

  ngOnInit(): void {
    this.usersService.users().subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
}
