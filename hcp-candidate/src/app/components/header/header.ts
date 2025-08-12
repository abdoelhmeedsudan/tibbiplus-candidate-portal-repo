import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
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

  public get isArabic(): boolean {
    return this.languageService.isArabic;
  }

  public get isRTL(): boolean {
    return this.languageService.isRTL;
  }
}
