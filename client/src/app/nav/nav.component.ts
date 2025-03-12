import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  user: any = {};
  constructor(private accountService: AccountService){

  }

  getCurrentUser(){
    return this.accountService.getCurrentUser();
  }

  login(){
    console.log("Login!!!");
    this.accountService.login(this.user).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => console.log(err)
    })
  }

  logout(){
    this.accountService.logout();
  }
}
