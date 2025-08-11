import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = signal<string>('ar');
  private isRTL = signal<boolean>(true);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    let savedLanguage = 'ar'; // default language
    
    if (this.isBrowser) {
      savedLanguage = localStorage.getItem('language') || 'ar';
    }
    
    this.setLanguage(savedLanguage);
  }

  setLanguage(language: string): void {
    this.currentLanguage.set(language);
    this.isRTL.set(language === 'ar');
    this.translate.use(language);
    
    if (this.isBrowser) {
      localStorage.setItem('language', language);
      
      // Update document direction and language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      
      // Update body class for RTL/LTR styling
      document.body.className = document.body.className.replace(/(rtl|ltr)/, '');
      document.body.classList.add(language === 'ar' ? 'rtl' : 'ltr');
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage.asReadonly();
  }

  getIsRTL() {
    return this.isRTL.asReadonly();
  }

  toggleLanguage(): void {
    const newLanguage = this.currentLanguage() === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLanguage);
  }
}
