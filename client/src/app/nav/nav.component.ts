import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  user: any = {};
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getCurrentUser() {
    return this.accountService.getCurrentUser();
  }

  login() {
    console.log('Login!!!');
    this.accountService.login(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/members');
      },
      error: (err) => this.toastr.error(err.error),
    });
  }

  logout() {
    this.accountService.logout();

    this.router.navigateByUrl('/');
  }
}
