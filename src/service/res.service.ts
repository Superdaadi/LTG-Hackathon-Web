import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})

export class ResService {

    private readonly STORAGE_KEY = 'results';


    private correctAnswers = ["1834", "Ente", "torvalds", "a5lKmJkl", "fingerprint", "Kaspersky"]


    constructor(private router: Router) {

    }



    public addResToLocalStorage(levelNumber: number, input: string) {
        // Bestehende Daten holen
        const existing = localStorage.getItem(this.STORAGE_KEY);
        let results = existing ? JSON.parse(existing) : [];

        // Prüfen, ob Level schon vorhanden ist
        const index = results.findIndex((r: any) => r.level === levelNumber);

        const newEntry = {
            level: levelNumber,
            input: input,
            timestamp: new Date().toISOString()
        };

        if (index !== -1) {
            // Falls Level existiert → überschreiben
            results[index] = newEntry;
        } else {
            // Falls noch nicht existiert → hinzufügen
            results.push(newEntry);
        }

        // Speichern
        localStorage.setItem(this.STORAGE_KEY   , JSON.stringify(results));

        console.log("Saved:", newEntry);
    }



    getHighestSavedLevel(): number {
        const existing = localStorage.getItem(this.STORAGE_KEY);

        if (!existing) {
            return 0;
        }

        const results = JSON.parse(existing);

        if (!Array.isArray(results) || results.length === 0) {
            return 0;
        }

        // Maximum suchen
        const highest = Math.max(...results.map((r: any) => r.level));
        return highest;
    }



    getSavedRes(levelID: number) {
        console.log("levelID: " + levelID)

        const existing = localStorage.getItem(this.STORAGE_KEY);

        if (!existing) {
            return null; // noch nichts gespeichert
        }

        const results = JSON.parse(existing);

        if (!Array.isArray(results)) {
            return null;
        }

        // Level suchen
        const found = results.find((r: any) => r.level === levelID);

        console.log("Found: " + found)

        return found ? found.input : null;
    }



    compareAllResults() {
        const storageKey = this.STORAGE_KEY;
        const existing = localStorage.getItem(storageKey);
        if (!existing) return [];

        const results = JSON.parse(existing);
        if (!Array.isArray(results)) return [];

        const comparison = results.map((res: any) => {
            // Index im Array = level - 1
            const correctAnswer = this.correctAnswers[res.level - 1];

            // Normalize: trim + lowercase
            const userInput = res.input?.trim().toLowerCase() || '';
            const solution = correctAnswer?.trim().toLowerCase() || '';

            const isCorrect = userInput === solution;

            return {
                level: res.level,
                input: res.input,
                solution: correctAnswer || null,
                correct: isCorrect,
                timestamp: res.timestamp
            };
        });

        return comparison;
    }




}
