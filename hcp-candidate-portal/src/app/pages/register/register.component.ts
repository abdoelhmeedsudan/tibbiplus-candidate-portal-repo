import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {{ 'navigation.register' | translate }}
          </h1>
          <p class="text-lg text-gray-600">
            إنشاء حساب - قريباً
          </p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {}
