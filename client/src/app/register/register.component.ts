import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  registerModel: any = {};

  constructor(private accountService: AccountService){

  }

  register() {
    this.accountService.register(this.registerModel).subscribe({
      next: res => {
        console.log(res);
        this.cancel()
      },
      error: err => console.log(err),
      complete: () => console.log('complete!!!') 
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
