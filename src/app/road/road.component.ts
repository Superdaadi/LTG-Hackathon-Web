import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-road',
  standalone: true,
  imports: [],
  templateUrl: './road.component.html',
  styleUrl: './road.component.css'
})
export class RoadComponent {
  currentPosition = 0;

  pathPoints = [
    { x: 5, y: 30 },
    { x: 20, y: 40 },
    { x: 35, y: 30 },
    { x: 50, y: 40 },
    { x: 65, y: 30 },
    { x: 80, y: 40 },
  ];

  constructor(private router: Router){}

  moveTo(index: number) {
    console.log(index + "/" + this.currentPosition)
    
    if(index === this.currentPosition) {
      this.router.navigate(['/level', index + 1])
    }

    if(index === this.currentPosition + 1 || index === this.currentPosition - 1)
      this.currentPosition = index;

  }
}
