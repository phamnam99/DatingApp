import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'DatingApp';
  users: any;

  constructor(private http: HttpClient){} 

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: res => this.users = res,
      error: err => console.log(err),
      complete: () => console.log('Complete!') 
    })
  }
}
