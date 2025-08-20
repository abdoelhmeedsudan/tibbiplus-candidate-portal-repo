import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationService } from '../../services/translation.service';
import { LanguageSwitcherComponent } from '../../components/language-switcher/language-switcher.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { TranslatePipe, TranslateFieldPipe, TranslateValidationPipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-translation-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    LanguageSwitcherComponent,
    FormErrorComponent,
    FormFieldComponent,
    TranslatePipe,
    TranslateFieldPipe,
    TranslateValidationPipe
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="max-w-4xl mx-auto">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ 'app.title' | translate }}
          </h1>
          <p class="text-xl text-gray-600">
            {{ 'app.subtitle' | translate }}
          </p>
          
          <!-- Language Switcher -->
          <div class="mt-6 flex justify-center">
            <app-language-switcher></app-language-switcher>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Translation Methods Demo -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-6">{{ 'Translation Methods' | translate }}</h2>
            
            <div class="space-y-4">
              <div class="p-4 bg-blue-50 rounded-lg">
                <h3 class="font-semibold text-blue-900">Using Pipe:</h3>
                <p class="text-blue-800">{{ 'navigation.home' | translate }}</p>
              </div>

              <div class="p-4 bg-green-50 rounded-lg">
                <h3 class="font-semibold text-green-900">Using Service Method:</h3>
                <p class="text-green-800">{{ getNavigationText('jobs') }}</p>
              </div>

              <div class="p-4 bg-purple-50 rounded-lg">
                <h3 class="font-semibold text-purple-900">Field Names:</h3>
                <p class="text-purple-800">{{ 'firstName' | translateField }}</p>
              </div>

              <div class="p-4 bg-yellow-50 rounded-lg">
                <h3 class="font-semibold text-yellow-900">Validation Messages:</h3>
                <p class="text-yellow-800">{{ 'required' | translateValidation }}</p>
              </div>

              <div class="p-4 bg-red-50 rounded-lg">
                <h3 class="font-semibold text-red-900">With Interpolation:</h3>
                <p class="text-red-800">
                  {{ 'auth.validation.minlength' | translate: { min: 6 } }}
                </p>
              </div>
            </div>
          </div>

          <!-- Form with Translation Demo -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-6">{{ 'Form Example' | translate }}</h2>
            
            <form [formGroup]="demoForm" class="space-y-4">
              
              <!-- Using Form Field Component -->
              <app-form-field
                [label]="'auth.register.first_name' | translate"
                fieldName="firstName"
                [required]="true"
                icon="user"
                [placeholder]="'placeholders.first_name' | translate"
                [control]="demoForm.get('firstName')"
              ></app-form-field>

              <!-- Using Form Field Component -->
              <app-form-field
                [label]="'auth.register.email' | translate"
                fieldName="email"
                type="email"
                [required]="true"
                icon="envelope"
                [placeholder]="'placeholders.email' | translate"
                [control]="demoForm.get('email')"
              ></app-form-field>

              <!-- Manual input with error component -->
              <div class="form-group">
                <label [for]="'manual-phone'" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ 'auth.register.phone' | translate }}
                  <span class="text-red-500">{{ 'common.required' | translate }}</span>
                </label>
                <input
                  id="manual-phone"
                  type="tel"
                  formControlName="phone"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  [placeholder]="'placeholders.phone' | translate"
                  [class.border-red-500]="demoForm.get('phone')?.invalid && demoForm.get('phone')?.touched"
                />
                
                <app-form-error
                  [control]="demoForm.get('phone')"
                  fieldName="phone"
                ></app-form-error>
              </div>

              <button
                type="button"
                (click)="submitDemo()"
                class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {{ 'common.submit' | translate }}
              </button>
            </form>
          </div>
        </div>

        <!-- Language Information -->
        <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-6">{{ 'Language Information' | translate }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-4 bg-gray-50 rounded-lg">
              <h3 class="font-semibold text-gray-900">Current Language</h3>
              <p class="text-gray-700">{{ currentLanguage.nativeName }}</p>
            </div>
            
            <div class="p-4 bg-gray-50 rounded-lg">
              <h3 class="font-semibold text-gray-900">Direction</h3>
              <p class="text-gray-700">{{ translationService.getLanguageDirection() }}</p>
            </div>
            
            <div class="p-4 bg-gray-50 rounded-lg">
              <h3 class="font-semibold text-gray-900">Is RTL</h3>
              <p class="text-gray-700">{{ translationService.isRTL() ? 'Yes' : 'No' }}</p>
            </div>
            
            <div class="p-4 bg-gray-50 rounded-lg">
              <h3 class="font-semibold text-gray-900">Language Code</h3>
              <p class="text-gray-700">{{ currentLanguage.code }}</p>
            </div>
          </div>
        </div>

        <!-- Navigation Demo -->
        <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-6">{{ 'Navigation Examples' | translate }}</h2>
          
          <div class="flex flex-wrap gap-4">
            <a 
              routerLink="/home" 
              class="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
            >
              {{ 'navigation.home' | translate }}
            </a>
            
            <a 
              routerLink="/jobs" 
              class="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              {{ 'navigation.jobs' | translate }}
            </a>
            
            <a 
              routerLink="/auth/login" 
              class="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
            >
              {{ 'navigation.login' | translate }}
            </a>
            
            <a 
              routerLink="/auth/register" 
              class="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors"
            >
              {{ 'navigation.register' | translate }}
            </a>
          </div>
        </div>

        <!-- Success/Error Messages Demo -->
        <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-6">{{ 'Messages Demo' | translate }}</h2>
          
          <div class="space-y-4">
            <div class="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <i class="fas fa-check-circle mr-2"></i>
              {{ 'messages.success.registration' | translate }}
            </div>
            
            <div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <i class="fas fa-exclamation-circle mr-2"></i>
              {{ 'messages.errors.registration' | translate }}
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
  `]
})
export class TranslationDemoComponent {
  public translationService = inject(TranslationService);
  private fb = inject(FormBuilder);

  public demoForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]]
  });

  public get currentLanguage() {
    return this.translationService.getCurrentLanguage();
  }

  public getNavigationText(key: string): string {
    return this.translationService.getNavigationText(key);
  }

  public submitDemo(): void {
    if (this.demoForm.valid) {
      alert(this.translationService.getMessage('success', 'registration'));
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.demoForm.controls).forEach(field => {
        const control = this.demoForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      alert(this.translationService.getMessage('errors', 'registration'));
    }
  }
}
