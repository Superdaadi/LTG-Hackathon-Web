import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import levelData from '../../../assets/level/level.json';
import { Level } from './level-content.model';



@Component({
  selector: 'app-level-content',
  standalone: true,
  imports: [],
  templateUrl: './level-content.component.html',
  styleUrl: './level-content.component.css'
})

export class LevelContentComponent {

  protected levelNumber!: number
  protected levels: Level[] = levelData.levels;
  protected level: Level = {
    heading: "",
    difficulty: 0,
    level: []
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.levelNumber = Number(params.get('id') || '')
    });
    console.log('Level number:', this.levelNumber);

    this.level = levelData.levels[this.levelNumber - 1]


    console.log(this.levels)
  }

  openLink(url?: string) {
    if(url)
      window.open(url, '_blank');
  }

  downloadFile(filePath?: string) {
    if (!filePath) {
      console.warn('No file path provided');
      return;
    }

    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || 'download.bat';
    link.click();
  }



}
