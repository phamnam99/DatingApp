import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  user: any = {};
  loggedIn = false;
  constructor(private accountService: AccountService){

  }
  login(){
    console.log("Login!!!");
    console.log(this.user);
    this.accountService.login(this.user).subscribe({
      next: res => {
        console.log(res);
        this.loggedIn = true;
      },
      error: err => console.log(err)
    })
  }

  logout(){
    this.loggedIn = false;
  }
}
