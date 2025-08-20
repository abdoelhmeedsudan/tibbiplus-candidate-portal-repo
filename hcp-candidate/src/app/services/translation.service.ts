import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'selectedLanguage';
  private readonly DEFAULT_LANGUAGE = 'ar';
  
  private currentLanguageSubject = new BehaviorSubject<Language>(this.getDefaultLanguage());
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  public readonly supportedLanguages: Language[] = [
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      dir: 'rtl',
      flag: '🇸🇦'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      dir: 'ltr',
      flag: '🇺🇸'
    }
  ];

  constructor(private translate: TranslateService) {
    const defaultLang = this.getDefaultLanguage();
    this.currentLanguageSubject.next(defaultLang);
    this.initializeTranslation();
  }

  private initializeTranslation(): void {
    // Set available languages
    this.translate.addLangs(this.supportedLanguages.map(lang => lang.code));
    
    // Set default language
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    
    // Load saved language or use default
    const savedLanguage = this.getSavedLanguage();
    this.setLanguage(savedLanguage.code);
  }


    
    private getDefaultLanguage(): Language {
  if (!this.supportedLanguages || !Array.isArray(this.supportedLanguages)) {
    return { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦' };
  }
  return this.supportedLanguages.find(lang => lang.code === this.DEFAULT_LANGUAGE) || this.supportedLanguages[0];

  }

private getSavedLanguage(): Language {
  let savedCode = this.DEFAULT_LANGUAGE;

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    savedCode = localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANGUAGE;
  }

  return this.supportedLanguages.find(lang => lang.code === savedCode) || this.getDefaultLanguage();
}

  public getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  public setLanguage(languageCode: string): void {
    const language = this.supportedLanguages.find(lang => lang.code === languageCode);
    if (!language) {
      console.warn(`Language ${languageCode} is not supported`);
      return;
    }

    // Set the language in ngx-translate
    this.translate.use(languageCode);
    
    // Update current language
    this.currentLanguageSubject.next(language);
    
    // Save to localStorage
     if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, languageCode);
     }
    // Update document direction and language
    this.updateDocumentDirection(language);
  }

  public toggleLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    const nextLang = currentLang.code === 'ar' ? 'en' : 'ar';
    this.setLanguage(nextLang);
  }

  public isCurrentLanguage(languageCode: string): boolean {
    return this.getCurrentLanguage().code === languageCode;
  }

  public isRTL(): boolean {
    return this.getCurrentLanguage().dir === 'rtl';
  }

  public getLanguageDirection(): 'ltr' | 'rtl' {
    return this.getCurrentLanguage().dir;
  }

  private updateDocumentDirection(language: Language): void {
      if (typeof document === 'undefined') {
    return; // We are in SSR, skip DOM manipulation
  }
    document.documentElement.dir = language.dir;
    document.documentElement.lang = language.code;
    
    // Add RTL/LTR class to body for CSS styling
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(language.dir);
  }

  // Translation helper methods
  public instant(key: string, interpolateParams?: any): string {
    return this.translate.instant(key, interpolateParams);
  }

  public get(key: string, interpolateParams?: any): Observable<string> {
    return this.translate.get(key, interpolateParams);
  }

  public getMultiple(keys: string[], interpolateParams?: any): Observable<any> {
    return this.translate.get(keys, interpolateParams);
  }

  // Specific translation methods for common use cases
  public getFieldName(fieldKey: string): string {
    return this.instant(`auth.field_names.${fieldKey}`);
  }

  public getValidationMessage(validationType: string, params?: any): string {
    return this.instant(`auth.validation.${validationType}`, params);
  }

  public getCommonText(key: string): string {
    return this.instant(`common.${key}`);
  }

  public getNavigationText(key: string): string {
    return this.instant(`navigation.${key}`);
  }

  public getAuthText(section: string, key: string): string {
    return this.instant(`auth.${section}.${key}`);
  }

  public getPlaceholder(fieldKey: string): string {
    return this.instant(`placeholders.${fieldKey}`);
  }

  public getHelpText(fieldKey: string): string {
    return this.instant(`help_text.${fieldKey}`);
  }

  public getMessage(type: 'success' | 'errors', key: string): string {
    return this.instant(`messages.${type}.${key}`);
  }

  // Language detection methods
  public detectBrowserLanguage(): string {
     if (typeof navigator === 'undefined') {
    return this.DEFAULT_LANGUAGE; // Fallback for SSR
  }
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const langCode = browserLang.split('-')[0];
    
    // Check if detected language is supported
    const supportedLang = this.supportedLanguages.find(lang => lang.code === langCode);
    return supportedLang ? langCode : this.DEFAULT_LANGUAGE;
  }

  public useBrowserLanguage(): void {
    const detectedLang = this.detectBrowserLanguage();
    this.setLanguage(detectedLang);
  }

  // Format text for RTL/LTR
  public formatText(text: string): string {
    if (this.isRTL()) {
      // Add any RTL-specific formatting if needed
      return text;
    }
    return text;
  }

  // Number and date formatting based on locale
  public formatNumber(value: number): string {
    const currentLang = this.getCurrentLanguage();
    return new Intl.NumberFormat(currentLang.code === 'ar' ? 'ar-SA' : 'en-US').format(value);
  }

  public formatDate(date: Date): string {
    const currentLang = this.getCurrentLanguage();
    return new Intl.DateTimeFormat(currentLang.code === 'ar' ? 'ar-SA' : 'en-US').format(date);
  }

  public formatCurrency(amount: number, currency: string = 'SAR'): string {
    const currentLang = this.getCurrentLanguage();
    return new Intl.NumberFormat(currentLang.code === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
}
