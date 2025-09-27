import { Component, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private route = inject(ActivatedRoute);

  searchQuery: string = 'allererste digitale Angriff';

  constructor(private router: Router) {
    this.route.queryParamMap.subscribe(params => {
      this.searchQuery = params.get('q') || '';
      console.log('Aktuelle Query:', this.searchQuery);
    });
  }

  doSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
    
    console.log('Suche gestartet für:', this.searchQuery);

    // Hier könnte später API Call rein
  }
}
