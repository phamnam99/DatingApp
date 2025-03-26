import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_model/member.model';
import { MembersService } from '../../_services/member.service';
import { AccountService } from '../../_services/account.service';
import { NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [NgIf, TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit{
  @ViewChild("editForm") editForm?: NgForm;
  member?: Member;

  constructor(
    private memberService: MembersService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const user = this.accountService.currentUser;
    if(!user) return;

    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe({
      next: _ => {
        this.toastr.success('Lưu thành công');
        this.editForm?.reset(this.member);
      }
    })
  }
}
