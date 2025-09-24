import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { LoginLevelComponent } from './login-level/login-level.component';
import { LevelContentComponent } from './level-content/level-content.component';
import { LocalService } from '../../service/local.service';
import levelData from '../../assets/level/level.json';
import { Level } from './level-content/level-content.model';


@Component({
  selector: 'app-level',
  standalone: true,
  imports: [
    LevelContentComponent
  ],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})
export class LevelComponent {
  timeLeft: number = 0;
  displayTime: string = '';
  private intervalId: any;
  protected levelNumber!: number;
  protected level: Level = {
    heading: "",
    difficulty: 0,
    level: []
  };

  constructor (private router: Router, private route: ActivatedRoute, protected localService: LocalService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(parms => {
      this.levelNumber = Number(parms.get('id') || 0)
    })

    console.log('Level number:', this.levelNumber);

    this.level = levelData.levels[this.levelNumber - 1];

    /*this.updateDisplayTime();

    this.intervalId = setInterval(() => {
      if (this.timeLeft >= 0) {
        this.timeLeft ++;
        this.updateDisplayTime();
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);*/
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
    if(this.levelNumber != null) {
      localStorage.setItem(this.levelNumber.toString(), "ja")
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
      this.router.navigate(['road']);
    }
  }

}
