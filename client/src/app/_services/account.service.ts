import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService { 
  baseUrl = "https://localhost:5001/api/account/";
  constructor(private http: HttpClient) { }

  login(user: any){
    return this.http.post(this.baseUrl + "login", user);
  }
}
