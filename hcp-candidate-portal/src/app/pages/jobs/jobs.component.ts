import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{ 'navigation.jobs' | translate }}
          </h1>
          <p class="text-lg text-gray-600">
            البحث عن الوظائف الطبية - قريباً
          </p>
        </div>
      </div>
    </div>
  `
})
export class JobsComponent {}
