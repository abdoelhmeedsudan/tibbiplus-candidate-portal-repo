// Test translation service
import { TranslateService } from '@ngx-translate/core';

export class TranslationTest {
  constructor(private translate: TranslateService) {}
  
  testTranslations() {
    console.log('Testing translation service...');
    
    // Set language to Arabic
    this.translate.use('ar').subscribe(() => {
      console.log('Arabic translations loaded');
      this.translate.get('auth.register.title').subscribe((res: string) => {
        console.log('Arabic register title:', res);
      });
    });
    
    // Set language to English
    this.translate.use('en').subscribe(() => {
      console.log('English translations loaded');
      this.translate.get('auth.register.title').subscribe((res: string) => {
        console.log('English register title:', res);
      });
    });
  }
}
