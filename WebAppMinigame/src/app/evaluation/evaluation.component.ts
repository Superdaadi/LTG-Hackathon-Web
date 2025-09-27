import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResService } from '../../service/res.service';
import { Router } from '@angular/router';

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

  constructor(private resService: ResService, private router: Router) {
    this.res = this.resService.compareAllResults()
  }

  toggleButton(index: number) {
    this.buttonsOut = this.buttonsOut.map(() => false);
    this.buttonsOut[index] = !this.buttonsOut[index];

    this.index = index
  }

  exit(): void {
    this.router.navigate(['landing'])
  }

  

}
