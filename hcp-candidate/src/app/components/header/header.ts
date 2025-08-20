import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public languageService = inject(LanguageService);
  public translationService = inject(TranslationService);

  public get isArabic(): boolean {
    return this.languageService.isArabic;
  }

  public get isRTL(): boolean {
    return this.languageService.isRTL;
  }

  public getNavigationText(key: string): string {
    return this.translationService.getNavigationText(key);
  }
}
