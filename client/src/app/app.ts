import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom, using } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected title = 'Dating app';
  protected members = signal<User []>([])

  async ngOnInit() {
    // this.http.get('https://localhost:5001/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.error(error),
    //   complete: () => console.log('Completed the http request')
      
      
    // })

    this.members.set(await this.getMember());
    this.setCurrentUser();
  }

   setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
   }


  async getMember(){
    try {
      return lastValueFrom(this.http.get<User []>('https://localhost:5001/api/members'))

    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }

}
