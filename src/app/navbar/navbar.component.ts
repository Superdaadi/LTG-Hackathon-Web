import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  protected path: string = ""
  protected title: string = ""
  private routerSub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updatePath(this.router.url);

    // Reagiere auf spätere Routenänderungen
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const nav = event as NavigationEnd;
      this.updatePath(nav.urlAfterRedirects);
    });
  }

  private updatePath(url: string) {
    this.path = url.split('/')[1] || '';
    console.log('Aktueller Subpath:', this.path);
    if(this.path == "ev")
        this.title = " - Auswertung"
    else if(this.path == "level")
      this.title = " - Level"
    else
      this.title = ""
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

}
