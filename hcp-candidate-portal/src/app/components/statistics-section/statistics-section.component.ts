import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

interface StatItem {
  icon: string;
  value: number;
  label: string;
  suffix?: string;
}

@Component({
  selector: 'app-statistics-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold text-gray-900">{{ 'home.statistics.title' | translate }}</h2>
          <p class="mt-2 text-lg text-gray-600">
            {{ 'home.statistics.subtitle' | translate }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let stat of stats; trackBy: trackByStat" class="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center fade-in-up">
            <div class="rounded-full bg-blue-100 p-3 mb-4">
              <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path *ngIf="stat.icon === 'briefcase'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                <path *ngIf="stat.icon === 'users'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                <path *ngIf="stat.icon === 'building'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                <path *ngIf="stat.icon === 'calendar'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-1">
              <span [attr.data-target]="stat.value" class="counter">{{ getDisplayValue(stat) }}</span>
            </h3>
            <p class="text-gray-600">{{ stat.label | translate }}</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class StatisticsSectionComponent implements OnInit {
  private languageService = inject(LanguageService);
  
  readonly isRTL = this.languageService.getIsRTL();
  
  stats: StatItem[] = [
    {
      icon: 'briefcase',
      value: 1250,
      label: 'home.statistics.jobs',
      suffix: '+'
    },
    {
      icon: 'users',
      value: 8700,
      label: 'home.statistics.professionals',
      suffix: '+'
    },
    {
      icon: 'building',
      value: 340,
      label: 'home.statistics.clinics'
    },
    {
      icon: 'calendar',
      value: 95,
      label: 'home.statistics.successRate',
      suffix: '%'
    }
  ];

  private animatedValues = signal<{[key: number]: number}>({});

  ngOnInit(): void {
    this.animateCounters();
  }

  trackByStat(index: number, stat: StatItem): string {
    return stat.icon;
  }

  getDisplayValue(stat: StatItem): string {
    const currentValue = this.animatedValues()[this.stats.indexOf(stat)] || 0;
    return currentValue + (stat.suffix || '');
  }

  private animateCounters(): void {
    this.stats.forEach((stat, index) => {
      this.animateValue(index, 0, stat.value, 2000);
    });
  }

  private animateValue(index: number, start: number, end: number, duration: number): void {
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (end - start) * easeOutCubic);
      
      this.animatedValues.update(values => ({
        ...values,
        [index]: currentValue
      }));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}
