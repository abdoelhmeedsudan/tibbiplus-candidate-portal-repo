import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="md:flex md:items-center md:justify-between">
          <div [class]="'md:w-1/2 ' + (isRTL() ? 'text-right md:pr-8' : 'text-left md:pl-8')">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight fade-in-up">
              {{ 'home.hero.title' | translate }}
            </h1>
            <p class="mt-4 text-lg text-blue-100 fade-in-up">
              {{ 'home.hero.subtitle' | translate }}
            </p>
            
            <div [class]="'mt-8 flex flex-col sm:flex-row gap-4 fade-in-up ' + (isRTL() ? 'justify-end' : 'justify-start')">
              <a
                routerLink="/jobs"
                class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:text-lg transition-all duration-200 hover:shadow-lg"
              >
                <svg [class]="'w-5 h-5 ' + (isRTL() ? 'ml-2' : 'mr-2')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {{ 'home.hero.cta' | translate }}
              </a>
              <a
                routerLink="/hire"
                class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-950 md:text-lg transition-all duration-200 hover:shadow-lg"
              >
                <svg [class]="'w-5 h-5 ' + (isRTL() ? 'ml-2' : 'mr-2')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                {{ 'home.hero.secondaryCta' | translate }}
              </a>
            </div>
          </div>
          
          <div class="hidden md:block md:w-1/2 fade-in-up">
            <img 
              src="https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Medical team" 
              class="rounded-lg shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-3xl"></div>
    </div>
  `
})
export class HeroSectionComponent {
  private languageService = inject(LanguageService);
  
  readonly isRTL = this.languageService.getIsRTL();
}
