import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './google.component.html',
  styleUrl: './google.component.css'
})
export class GoogleComponent {

  protected searchQuery: string = '';
  protected loggedIn: string | null

  constructor(private router: Router) {
    this.loggedIn = localStorage.getItem('loggedIn')

    if(this.loggedIn != 'true') {
      localStorage.setItem('loggedIn', 'false');
    }
  }

  toLogin() {
    this.router.navigate(['login'])
  }
  logout () {
    localStorage.setItem('loggedIn', 'false');
    this.loggedIn = 'false'
  }

  doSearch() {
    if (this.loggedIn != 'true') {
      this.router.navigate(['login'])
      return
    }
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }


}
