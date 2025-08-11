import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="bg-blue-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center">
            <svg class="h-5 w-5 mr-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9a2.5 2.5 0 01-2.5 2.5z" />
            </svg>
            <span class="text-sm font-medium">
              {{ isRTL() 
                ? "أحدث الأخبار: تم إطلاق خدمة التوظيف السريع للكوادر الطبية المتخصصة" 
                : "Latest News: Quick hiring service for specialized medical professionals launched"
              }}
            </span>
          </div>
          <button class="text-blue-200 hover:text-white transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class NewsSectionComponent {
  private languageService = inject(LanguageService);
  
  readonly isRTL = this.languageService.getIsRTL();
}
