import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  public languageService = inject(LanguageService);
  public translationService = inject(TranslationService);

  public get isArabic(): boolean {
    return this.languageService.isArabic;
  }

  public get isRTL(): boolean {
    return this.languageService.isRTL;
  }

  public get direction(): 'rtl' | 'ltr' {
    return this.languageService.direction;
  }

  // Translation helper methods
  public getHomeText(key: string): string {
    return this.translationService.instant(`home.${key}`);
  }

  public getNavigationText(key: string): string {
    return this.translationService.getNavigationText(key);
  }
}
