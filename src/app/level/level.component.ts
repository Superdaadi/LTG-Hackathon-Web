import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginLevelComponent } from './login-level/login-level.component';
import { Router } from '@angular/router';

import { LocalService } from '../../service/local.service';


@Component({
  selector: 'app-level',
  standalone: true,
  imports: [
    LoginLevelComponent
  ],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})
export class LevelComponent {
  timeLeft: number = 0;
  displayTime: string = '';
  private intervalId: any;
  protected id!: string

  constructor (private router: Router, private route: ActivatedRoute, protected localService: LocalService) {
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

  addToStorage() {
    if(this.id != "") {
      localStorage.setItem(this.id, "ja")
    }
  }

  completeLevel() {
    var currentLevel

    this.route.paramMap.subscribe(params => {
      const levelParam = params.get('id'); // 'id' muss zum Pfad passen!
      currentLevel = levelParam ? +levelParam : 0;
    });

    if(currentLevel) {
      currentLevel --;
      this.localService.completeLevel(currentLevel, "Ergebnis");
      this.router.navigate(['/road']);
    }
  }

}
