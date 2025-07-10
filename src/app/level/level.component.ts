import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-level',
  standalone: true,
  imports: [],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})
export class LevelComponent {
  timeLeft: number = 0;
  displayTime: string = '';
  private intervalId: any;
  protected id!: string

  constructor (private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(parms => {
      this.id = parms.get('id') || ''
    })

    console.log("id " + this.id)

    this.updateDisplayTime();

    this.intervalId = setInterval(() => {
      if (this.timeLeft >= 0) {
        this.timeLeft ++;
        this.updateDisplayTime();
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }


  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateDisplayTime(): void {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  addtToStorage() {
    if(this.id != "") {
      localStorage.setItem(this.id, "ja")
    }
  }

}
