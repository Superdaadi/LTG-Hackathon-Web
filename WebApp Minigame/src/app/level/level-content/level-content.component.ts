import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

import levelData from '../../../assets/level/level.json';
import { Level } from './level-content.model';
import { ResService } from '../../../service/res.service';



@Component({
  selector: 'app-level-content',
  standalone: true,
  imports: [
    FormsModule
  ],
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
  protected input = ""


  constructor(private route: ActivatedRoute, private router: Router, private resService: ResService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.levelNumber = Number(params.get('id') || '')
    });
    console.log('Level number:', this.levelNumber);

    this.level = levelData.levels[this.levelNumber - 1];

    this.input = this.resService.getSavedRes(this.levelNumber);


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

  inputSubmit(levelNumber: number) {
    if (!this.input) {
      alert('Bitte einen Wert eingeben');
      return;
    }

    console.log(this.input)

    try {
      this.resService.addResToLocalStorage(levelNumber, this.input);
    }
    catch(e) {
      console.log("Fehler beim Spreichern: " + e)
      return
    }

    this.router.navigate(['road'])
  }


}
