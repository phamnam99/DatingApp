import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../_model/member.model';
import { AccountService } from './account.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members!: Member[];
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private accountService: AccountService) {
    
  }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next: members => this.members = members
    });
  }

  getMember(username: string){
    const member = this.members?.find(x => x.userName == username);

    if(member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member?: Member){
    return this.http.put(this.baseUrl + 'users', member);
  }
}
