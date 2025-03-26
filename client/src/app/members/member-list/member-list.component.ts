import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/member.service';
import { Member } from '../../_model/member.model';
import { NgFor } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [NgFor, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members?: Member[];
  constructor(private memberService: MembersService) {}

  ngOnInit(): void { 
    if (this.memberService.members?.length === 0) {
      this.loadMembers();
    }
  }

  loadMembers() {
    this.memberService.getMembers();
  }
}
