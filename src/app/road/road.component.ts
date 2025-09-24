import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { LocalService } from '../../service/local.service';

export interface PathPoint {
  x: number;
  y: number;
  name: string;
  vis: boolean;
  result: string;
}

const pathPoints = [
  { x: 10, y: 20, vis: true, name: 'Start' },
  { x: 30, y: 40, vis: true, name: 'Checkpoint' },
  { x: 50, y: 60, vis: true, name: 'Ziel' }
];


@Component({
  selector: 'app-road',
  standalone: true,
  imports: [],
  templateUrl: './road.component.html',
  styleUrl: './road.component.css'
})
export class RoadComponent {
  currentPosition = 0;
  pathPoints: PathPoint[] = [];

  constructor(private router: Router, protected localService: LocalService){
    this.pathPoints = this.localService.syncPathPointsReturn()
  }

  ngOnInit() {
    this.localService.syncPathPoints();
    this.currentPosition = this.localService.getLastVisibleIndex();
  }

  start() {
    const pos = this.currentPosition + 1
    this.router.navigate(['/level', pos]);
  }

  resetPathPointsInLocal() {
    this.localService.resetToDefault();
    window.location.reload();
  }

  moveTo(index: number) {
    console.log(index + "/" + this.currentPosition)
    var index1 = index + 1;
    if(index === this.currentPosition) {
      //this.pathPoints[index1].vis = true
      this.router.navigate(['/level', index1])
      localStorage.setItem("level", index1.toString()) //ToDo
    }

    this.currentPosition = index;
  }
}
