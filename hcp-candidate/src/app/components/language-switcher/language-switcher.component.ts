import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      <button
        (click)="toggleLanguage()"
        class="flex items-center space-x-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
        [class]="languageService.getDirectionClasses()"
      >
        <span class="text-sm font-medium">
          {{ currentLanguage.nativeName }}
        </span>
        <i class="fas fa-globe text-sm"></i>
      </button>

      <!-- Dropdown for future expansion -->
      <div *ngIf="showDropdown" class="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[120px] z-50">
        <button
          *ngFor="let lang of languageService.languages"
          (click)="selectLanguage(lang.code)"
          class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
        >
          <span>{{ lang.nativeName }}</span>
          <i *ngIf="lang.code === languageService.currentLang" class="fas fa-check text-green-600"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .language-switcher {
      position: relative;
      display: inline-block;
    }

    .rtl {
      direction: rtl;
    }

    .rtl .space-x-2 > * + * {
      margin-left: 0;
      margin-right: 0.5rem;
    }

    .ltr .space-x-2 > * + * {
      margin-left: 0.5rem;
      margin-right: 0;
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  public languageService = inject(LanguageService);
  public translationService = inject(TranslationService);
  public showDropdown = false;
  private subscription = new Subscription();

  public get currentLanguage() {
    return this.languageService.currentLanguage();
  }

  ngOnInit(): void {
    // Subscribe to language changes to sync between services
    this.subscription.add(
      this.translationService.currentLanguage$.subscribe(language => {
        // Update the old language service to stay in sync
        this.languageService.setLanguage(language.code as 'ar' | 'en');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  public selectLanguage(langCode: 'ar' | 'en'): void {
    this.translationService.setLanguage(langCode);
    this.showDropdown = false;
  }

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
