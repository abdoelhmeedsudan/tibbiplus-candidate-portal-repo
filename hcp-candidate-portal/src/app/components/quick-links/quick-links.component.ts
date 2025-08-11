import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

interface QuickLink {
  title: string;
  description: string;
  icon: string;
  route: string;
  bgColor: string;
  iconColor: string;
}

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {{ 'home.features.title' | translate }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ isRTL() 
              ? "اكتشف جميع الخدمات المتاحة على منصتنا الطبية المتخصصة"
              : "Discover all available services on our specialized medical platform"
            }}
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div *ngFor="let link of quickLinks; trackBy: trackByLink" 
               class="group cursor-pointer">
            <a [routerLink]="link.route" 
               [class]="'block p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ' + link.bgColor">
              <div [class]="'rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 ' + link.iconColor">
                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path *ngIf="link.icon === 'search'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  <path *ngIf="link.icon === 'users'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path *ngIf="link.icon === 'building-2'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3 text-center">
                {{ link.title | translate }}
              </h3>
              <p class="text-gray-600 text-center leading-relaxed">
                {{ link.description | translate }}
              </p>
              <div class="mt-6 flex justify-center">
                <span class="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                  {{ isRTL() ? "اعرف المزيد" : "Learn More" }}
                  <svg 
                    [class]="'w-4 h-4 transition-transform group-hover:translate-x-1 ' + (isRTL() ? 'mr-2' : 'ml-2')"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path *ngIf="!isRTL()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    <path *ngIf="isRTL()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class QuickLinksComponent {
  private languageService = inject(LanguageService);
  
  readonly isRTL = this.languageService.getIsRTL();

  quickLinks: QuickLink[] = [
    {
      title: 'home.features.jobSearch.title',
      description: 'home.features.jobSearch.description',
      icon: 'search',
      route: '/jobs',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      iconColor: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'home.features.staffHiring.title',
      description: 'home.features.staffHiring.description',
      icon: 'users',
      route: '/hire',
      bgColor: 'bg-green-50 hover:bg-green-100',
      iconColor: 'bg-green-100 text-green-600'
    },
    {
      title: 'home.features.clinicManagement.title',
      description: 'home.features.clinicManagement.description',
      icon: 'building-2',
      route: '/clinics',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      iconColor: 'bg-purple-100 text-purple-600'
    }
  ];

  trackByLink(index: number, link: QuickLink): string {
    return link.route;
  }
}
