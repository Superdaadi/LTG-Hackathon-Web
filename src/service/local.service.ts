import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


export interface PathPoint {
  x: number;
  y: number;
  name: string;
  vis: boolean;
  result: string;
}
const defaultPathPoints: PathPoint[] = [
  { x: 5, y: 30, name: "Login", vis: true, result: "" },
  { x: 20, y: 40, name: "Level2", vis: false, result: "" },
  { x: 35, y: 30, name: "Level3", vis: false, result: "" },
  { x: 50, y: 40, name: "Level4", vis: false, result: "" },
  { x: 65, y: 30, name: "Level5", vis: false, result: "" },
  { x: 80, y: 40, name: "Level6", vis: false, result: "" },
];


@Injectable({
  providedIn: 'root'
})

export class LocalService {
  defaultPathPoints: PathPoint[] = defaultPathPoints

  pathPoints: PathPoint[] = [];

  private readonly STORAGE_KEY = 'pathPoints';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router){}

  ngOnInit() {
    this.saveToLocalStorage()
  }

  public syncPathPoints(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Not running in browser, skipping localStorage access.');
      this.pathPoints = [...defaultPathPoints];
      return;
    }
    const saved = localStorage.getItem(this.STORAGE_KEY);


    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length === defaultPathPoints.length) {
        this.pathPoints = parsed;
        return;
      } else {
        console.warn('Invalid pathPoints structure. Resetting to default.');
      }

      } catch (e) {
        console.error('Failed to parse pathPoints from localStorage:', e);
        this.pathPoints = [...defaultPathPoints];
        this.saveToLocalStorage();
      }
    }
    
    this.resetToDefault();
    
  }

  public syncPathPointsReturn(): PathPoint[] {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Not running in browser, skipping localStorage access.');
      this.pathPoints = [...defaultPathPoints];
      return this.defaultPathPoints;
    }
    const saved = localStorage.getItem(this.STORAGE_KEY);

    if (saved) {
      try {
        console.log(JSON.parse(saved))
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse pathPoints from localStorage:', e);
        this.saveToLocalStorage();
        return this.defaultPathPoints
      }
    } else {
      this.saveToLocalStorage();
      return this.defaultPathPoints
    }
  }

  public saveToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.pathPoints));
    }
  }


  public updatePathPoint(index: number, updatedData: Partial<PathPoint>): void {
    this.pathPoints[index] = { ...this.pathPoints[index], ...updatedData };
    this.saveToLocalStorage();
  }


  public resetToDefault(): void {
    this.pathPoints = [...defaultPathPoints];
    this.saveToLocalStorage();
  }
  


  public completeLevel(index: number, result: string): void {
    if (index < 0 || index >= this.pathPoints.length) return;

    this.pathPoints[index].result = result;

    const nextIndex = index + 1;
    if (nextIndex < this.pathPoints.length) {
      this.pathPoints[nextIndex].vis = true;
    }

    this.saveToLocalStorage();
  }


  public getLastVisibleIndex(): number {
    for (let i = this.pathPoints.length - 1; i >= 0; i--) {
      if (this.pathPoints[i].vis) {
        return i;
      }
    }
    return 0;
  }

  
}
