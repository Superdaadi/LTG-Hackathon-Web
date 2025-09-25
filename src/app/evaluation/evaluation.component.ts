import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResService } from '../../service/res.service';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent {

  protected buttonsOut = [true, false, false, false, false, false];
  protected index: number = 0

  protected res

  constructor(private resService: ResService) {
    this.res = this.resService.compareAllResults()
  }

  toggleButton(index: number) {
    this.buttonsOut = this.buttonsOut.map(() => false);
    this.buttonsOut[index] = !this.buttonsOut[index];

    this.index = index
  }

  clearSession(): void {
    localStorage.clear();
    console.log('Session storage cleared');
  }

  

}
