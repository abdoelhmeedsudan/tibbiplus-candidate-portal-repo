import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{ 'profile.dropdown.personalInfo' | translate }}
          </h1>
          <p class="text-lg text-gray-600">
            المعلومات الشخصية - قريباً
          </p>
        </div>
      </div>
    </div>
  `
})
export class PersonalInfoComponent {}
