import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from '../../_services/member.service';
import { Member } from '../../_model/member.model';
import { NgIf } from '@angular/common';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { Gallery, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [NgIf, TabsModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  images: GalleryItem[] = [];
  constructor(
    private route: ActivatedRoute,
    private memberService: MembersService
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    debugger;
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;

    this.memberService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        this.member.photos.map(p => {
          this.images.push(new ImageItem({src: p.url, thumb: p.url}))
        })
      },
    });
  }
}
