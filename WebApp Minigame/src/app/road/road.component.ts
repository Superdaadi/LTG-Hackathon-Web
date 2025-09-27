import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ResService } from '../../service/res.service';


export interface PathPointKords {
  x: number;
  y: number;
  name: string;
  vis: boolean;
}


@Component({
  selector: 'app-road',
  standalone: true,
  imports: [],
  templateUrl: './road.component.html',
  styleUrl: './road.component.css'
})
export class RoadComponent {

  protected currentPosition = 0;
  protected lastLevel = 0;

  protected defaultPathPoints: PathPointKords[] = [
    { x: 27, y: 66, name: "Login", vis: true },
    { x: 20, y: 41, name: "Level2", vis: false },
    { x: 34, y: 16, name: "Level3", vis: false },
    { x: 72.5, y: 20.5, name: "Level4", vis: false },
    { x: 78, y: 50, name: "Level5", vis: false },
    { x: 58, y: 64.5, name: "Level6", vis: false },
    { x: 49, y: 39, name: "Ziel", vis: false },
  ];

  constructor(private router: Router, private resService: ResService){
  }

  ngOnInit() {
    this.lastLevel = this.resService.getHighestSavedLevel()
    this.currentPosition = this.lastLevel
  }

  start() {
    console.log(this.currentPosition)
    if(this.currentPosition == 6) {
      this.router.navigate(['/ev']);
    }
    else {
      const pos = this.currentPosition + 1
      this.router.navigate(['/level', pos]);
    }
  }

  home() {
    this.router.navigate(['/landing']);
  }

  moveTo(index: number) {
    console.log(index + "/" + this.currentPosition)
    
    if(index === this.currentPosition) {
      if(this.currentPosition == 6) {
        this.router.navigate(['/ev']);
      }
      else {
        const pos = this.currentPosition + 1
        this.router.navigate(['/level', pos]);
      }
    }

    this.currentPosition = index;
  }
}
