import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<Theme>('light');
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    let theme: Theme = 'light'; // default theme
    
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      theme = savedTheme || systemTheme;
    }
    
    this.setTheme(theme);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    
    if (this.isBrowser) {
      localStorage.setItem('theme', theme);
      
      // Update document class
      document.documentElement.className = document.documentElement.className.replace(/(light|dark)/, '');
      document.documentElement.classList.add(theme);
    }
  }

  getCurrentTheme() {
    return this.currentTheme.asReadonly();
  }

  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  isDark(): boolean {
    return this.currentTheme() === 'dark';
  }
}
