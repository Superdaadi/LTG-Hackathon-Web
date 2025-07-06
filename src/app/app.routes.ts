import { Routes } from '@angular/router';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { RoadComponent } from './road/road.component';
import { LevelComponent } from './level/level.component';

export const routes: Routes = [
    {path: '', redirectTo: '/road', pathMatch: 'full' },
    {path: 'ev', component:EvaluationComponent},
    {path: 'road', component:RoadComponent},
    {path: 'level/:id', component: LevelComponent},
];
