import { Injectable, signal, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Language {
  code: 'ar' | 'en';
  name: string;
  nativeName: string;
  direction: 'rtl' | 'ltr';
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'app_language';
  
  // Available languages
  public readonly languages: Language[] = [
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      direction: 'rtl'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      direction: 'ltr'
    }
  ];

  // Current language signal
  public currentLanguage = signal<Language>(this.languages[0]); // Default to Arabic

  // Computed values
  public get currentLang(): 'ar' | 'en' {
    return this.currentLanguage().code;
  }

  public get isArabic(): boolean {
    return this.currentLanguage().code === 'ar';
  }

  public get isEnglish(): boolean {
    return this.currentLanguage().code === 'en';
  }

  public get direction(): 'rtl' | 'ltr' {
    return this.currentLanguage().direction;
  }

  public get isRTL(): boolean {
    return this.direction === 'rtl';
  }

  public get isLTR(): boolean {
    return this.direction === 'ltr';
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeLanguage();
    this.setupLanguageEffect();
  }

  /**
   * Initialize language from storage or browser preference
   */
  private initializeLanguage(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Try to get language from localStorage
      const storedLang = localStorage.getItem(this.storageKey) as 'ar' | 'en';
      
      if (storedLang && this.isValidLanguageCode(storedLang)) {
        this.setLanguage(storedLang);
      } else {
        // Try to detect from browser language
        const browserLang = this.detectBrowserLanguage();
        this.setLanguage(browserLang);
      }
    }
  }

  /**
   * Setup effect to update DOM when language changes
   */
  private setupLanguageEffect(): void {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const lang = this.currentLanguage();
        this.updateDocumentAttributes(lang);
      });
    }
  }

  /**
   * Set the current language
   */
  public setLanguage(langCode: 'ar' | 'en'): void {
    const language = this.languages.find(lang => lang.code === langCode);
    if (language) {
      this.currentLanguage.set(language);
      this.saveLanguageToStorage(langCode);
    }
  }

  /**
   * Toggle between Arabic and English
   */
  public toggleLanguage(): void {
    const newLang = this.isArabic ? 'en' : 'ar';
    this.setLanguage(newLang);
  }

  /**
   * Get language object by code
   */
  public getLanguage(code: 'ar' | 'en'): Language | undefined {
    return this.languages.find(lang => lang.code === code);
  }

  /**
   * Check if language code is valid
   */
  private isValidLanguageCode(code: string): code is 'ar' | 'en' {
    return ['ar', 'en'].includes(code);
  }

  /**
   * Detect browser language preference
   */
  private detectBrowserLanguage(): 'ar' | 'en' {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language || navigator.languages?.[0];
      
      // Check if browser language starts with 'ar'
      if (browserLang?.startsWith('ar')) {
        return 'ar';
      }
    }
    
    // Default to Arabic for Middle East region
    return 'ar';
  }

  /**
   * Save language preference to localStorage
   */
  private saveLanguageToStorage(langCode: 'ar' | 'en'): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, langCode);
    }
  }

  /**
   * Update document attributes for language and direction
   */
  private updateDocumentAttributes(language: Language): void {
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;
      
      // Set language attribute
      html.setAttribute('lang', language.code);
      
      // Set direction attribute
      html.setAttribute('dir', language.direction);
      
      // Add/remove RTL class for styling
      if (language.direction === 'rtl') {
        html.classList.add('rtl');
        html.classList.remove('ltr');
      } else {
        html.classList.add('ltr');
        html.classList.remove('rtl');
      }

      // Update document title direction if needed
      this.updateDocumentTitle();
    }
  }

  /**
   * Update document title based on language
   */
  private updateDocumentTitle(): void {
    // This can be extended to update page titles based on current language
    // For now, it's a placeholder for future implementation
  }

  /**
   * Get translation key (placeholder for future i18n integration)
   */
  public translate(key: string): string {
    // Placeholder for translation service integration
    // This would typically integrate with Angular i18n or a translation library
    return key;
  }

  /**
   * Get directional class names for styling
   */
  public getDirectionClasses(): string {
    return this.isRTL ? 'rtl text-right' : 'ltr text-left';
  }

  /**
   * Get margin/padding classes that respect direction
   */
  public getSpacingClass(property: 'margin' | 'padding', side: 'start' | 'end', size: string): string {
    const isStart = side === 'start';
    const actualSide = this.isRTL ? (isStart ? 'right' : 'left') : (isStart ? 'left' : 'right');
    
    return `${property.charAt(0)}${actualSide.charAt(0)}-${size}`;
  }

  /**
   * Get float class that respects direction
   */
  public getFloatClass(direction: 'start' | 'end'): string {
    if (direction === 'start') {
      return this.isRTL ? 'float-right' : 'float-left';
    } else {
      return this.isRTL ? 'float-left' : 'float-right';
    }
  }
}
