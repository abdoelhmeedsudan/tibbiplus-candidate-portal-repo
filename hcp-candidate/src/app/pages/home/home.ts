import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  public languageService = inject(LanguageService);

  public get isArabic(): boolean {
    return this.languageService.isArabic;
  }

  public get isRTL(): boolean {
    return this.languageService.isRTL;
  }

  public get direction(): 'rtl' | 'ltr' {
    return this.languageService.direction;
  }
}
