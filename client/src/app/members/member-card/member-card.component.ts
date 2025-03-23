import { Component, Input } from '@angular/core';
import { Member } from '../../_model/member.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input({required: true}) member!: Member;
}
