import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from './level-content.model'; 
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})



export class LevelContentService {
  constructor(private http: HttpClient) {}

  getLevels(): Observable<Level[]> {
    return this.http.get<{ levels: Level[] }>('assets/data/levels.json')
      .pipe(map(response => response.levels));
  }
}