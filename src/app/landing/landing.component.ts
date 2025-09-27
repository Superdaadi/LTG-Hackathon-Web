import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  protected test: string | null = null
  protected resetShown: boolean = true

  constructor(private router: Router) {
    this.test = localStorage.getItem('results')

    console.log(this.test)

    if(this.test == null) {
      this.resetShown = false
    }
  }

  start() {
    this.router.navigate(['/road'])
  }

  reset() {
    localStorage.clear()  
    this.resetShown = false
  }

}
