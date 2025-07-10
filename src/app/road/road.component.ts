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
    { x: 5, y: 30, name: "Login", vis: true },
    { x: 20, y: 40, name: "", vis: false },
    { x: 35, y: 30, name: "", vis: false },
    { x: 50, y: 40, name: "", vis: false },
    { x: 65, y: 30, name: "", vis: false },
    { x: 80, y: 40, name: "", vis: false },
  ];

  constructor(private router: Router){}

  ngOnInit() {
    var x = 0

    /*for(let level of pathPoints;) {
      
    }*/
  }

  moveTo(index: number) {
    console.log(index + "/" + this.currentPosition)
    var index1 = index + 1;
    if(index === this.currentPosition) {
      //this.pathPoints[index1].vis = true
      this.router.navigate(['/level', index1])
      localStorage.setItem("level", index1.toString()) //ToDo
    }

    if(index === this.currentPosition + 1 || index === this.currentPosition - 1)
      this.currentPosition = index;
  }
}
