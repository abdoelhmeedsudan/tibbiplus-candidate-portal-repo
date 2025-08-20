# NGX-Translate Integration Guide

## Overview

This project now includes comprehensive internationalization (i18n) support using **ngx-translate** for Arabic and English languages. The system provides seamless language switching, RTL/LTR direction handling, and consistent translations across all components.

## 🚀 Installation & Setup

### Dependencies Installed
- `@ngx-translate/core` - Core translation functionality
- `@ngx-translate/http-loader` - HTTP loader for translation files

### Configuration

The translation system is configured in `app.config.ts`:

```typescript
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        },
        defaultLanguage: 'ar',
        useDefaultLang: true
      })
    )
  ]
};
```

## 📁 File Structure

### Translation Files
```
src/assets/i18n/
├── ar.json    # Arabic translations
└── en.json    # English translations
```

### Services
```
src/app/services/
├── translation.service.ts    # Enhanced translation service
└── language.service.ts       # Existing language service (synced)
```

### Components
```
src/app/components/
├── language-switcher/        # Updated with translation support
├── form-error/              # Updated with translations
├── form-field/              # Form component with translations
└── translation-demo/        # Comprehensive demo component
```

### Pipes
```
src/app/pipes/
└── translate.pipe.ts        # Custom translation pipes
```

## 🌐 Translation Files Structure

### Arabic (ar.json)
```json
{
  "app": {
    "title": "المهن الصحية",
    "subtitle": "السعودية"
  },
  "navigation": {
    "home": "الرئيسية",
    "jobs": "الوظائف",
    "login": "تسجيل الدخول"
  },
  "auth": {
    "login": {
      "title": "تسجيل الدخول",
      "email": "البريد الإلكتروني"
    },
    "validation": {
      "required": "هذا الحقل مطلوب",
      "email": "يرجى إدخال بريد إلكتروني صحيح"
    }
  }
}
```

### English (en.json)
```json
{
  "app": {
    "title": "HealthCareers",
    "subtitle": "Saudi Arabia"
  },
  "navigation": {
    "home": "Home",
    "jobs": "Jobs",
    "login": "Login"
  },
  "auth": {
    "login": {
      "title": "Login",
      "email": "Email Address"
    },
    "validation": {
      "required": "This field is required",
      "email": "Please enter a valid email address"
    }
  }
}
```

## 🔧 Translation Service API

### TranslationService Methods

```typescript
// Basic translation
translationService.instant('navigation.home')
translationService.get('navigation.home').subscribe(text => console.log(text))

// With interpolation
translationService.instant('auth.validation.minlength', { min: 6 })

// Helper methods
translationService.getFieldName('firstName')        // Returns field display name
translationService.getValidationMessage('required')  // Returns validation message
translationService.getNavigationText('home')        // Returns navigation text
translationService.getAuthText('login', 'title')    // Returns auth section text
translationService.getMessage('success', 'registration') // Returns message

// Language management
translationService.setLanguage('en')                 // Set specific language
translationService.toggleLanguage()                  // Toggle between ar/en
translationService.getCurrentLanguage()              // Get current language object
translationService.isRTL()                          // Check if current language is RTL

// Formatting utilities
translationService.formatNumber(1234)               // 1,234 (localized)
translationService.formatDate(new Date())           // Localized date
translationService.formatCurrency(100, 'SAR')       // Localized currency
```

## 🎨 Usage Examples

### 1. Template with TranslateModule Pipe

```html
<h1>{{ 'app.title' | translate }}</h1>
<p>{{ 'auth.validation.minlength' | translate: { min: 6 } }}</p>
```

### 2. Component with TranslationService

```typescript
export class MyComponent {
  constructor(public translationService: TranslationService) {}
  
  getTitle(): string {
    return this.translationService.getAuthText('login', 'title');
  }
}
```

```html
<h2>{{ getTitle() }}</h2>
```

### 3. Custom Translation Pipes

```html
<!-- Field names -->
<label>{{ 'firstName' | translateField }}</label>

<!-- Validation messages -->
<div class="error">{{ 'required' | translateValidation }}</div>
```

### 4. Form Components with Translation

```html
<app-form-field
  [label]="'auth.register.email' | translate"
  fieldName="email"
  type="email"
  [placeholder]="'placeholders.email' | translate"
  [control]="form.get('email')"
></app-form-field>
```

### 5. Language Switcher Integration

```html
<app-language-switcher></app-language-switcher>
```

## 🔄 Language Switching

### Automatic Features
- **Document Direction**: Automatically sets `dir="rtl"` or `dir="ltr"`
- **Body Classes**: Adds `rtl` or `ltr` class to body
- **Language Attribute**: Sets `lang="ar"` or `lang="en"`
- **Local Storage**: Persists language preference

### Manual Language Setting

```typescript
// In component
this.translationService.setLanguage('en');

// Toggle between languages
this.translationService.toggleLanguage();

// Use browser language
this.translationService.useBrowserLanguage();
```

## 🔍 Form Validation Integration

### Updated FormErrorComponent

The `FormErrorComponent` now uses translations automatically:

```html
<app-form-error
  [control]="form.get('email')"
  fieldName="email"
></app-form-error>
```

### Custom Error Messages

```html
<app-form-error
  [control]="form.get('password')"
  fieldName="password"
  [customErrorMessages]="{
    minlength: 'auth.validation.password_too_short' | translate
  }"
></app-form-error>
```

## 🎯 Best Practices

### 1. Translation Key Naming
```
section.subsection.key
auth.login.title
navigation.home
messages.success.registration
```

### 2. Component Integration
```typescript
// Make translation service public for template access
constructor(public translationService: TranslationService) {}
```

### 3. Reactive Language Changes
```typescript
// Subscribe to language changes
this.translationService.currentLanguage$.subscribe(language => {
  // React to language changes
});
```

### 4. Interpolation Parameters
```html
<!-- Pass parameters for dynamic content -->
{{ 'welcome.message' | translate: { name: userName } }}
```

### 5. Fallback Handling
```typescript
// Always provide fallback values
const text = this.translationService.instant('key') || 'Fallback Text';
```

## 🧪 Testing Translation

### Demo Component
Use the `TranslationDemoComponent` to test all translation features:

```typescript
// Add to routes for testing
{
  path: 'translation-demo',
  component: TranslationDemoComponent
}
```

### Key Testing Scenarios
1. **Language Switching**: Toggle between Arabic and English
2. **Form Validation**: Test validation messages in both languages
3. **Direction Changes**: Verify RTL/LTR layout changes
4. **Interpolation**: Test dynamic parameter injection
5. **Fallbacks**: Test missing translation keys

## 📱 Responsive & Accessibility

### RTL/LTR Handling
```css
/* Automatic direction handling */
[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}

[dir="ltr"] .text-right {
  text-align: right;
}

[dir="rtl"] .text-right {
  text-align: left;
}
```

### Screen Reader Support
```html
<button [attr.aria-label]="'navigation.home' | translate">
  {{ 'navigation.home' | translate }}
</button>
```

## 🚀 Migration Guide

### From Hard-coded Text
```html
<!-- Before -->
<h1>تسجيل الدخول</h1>

<!-- After -->
<h1>{{ 'auth.login.title' | translate }}</h1>
```

### From Old Language Service
```typescript
// Before
this.languageService.currentLanguage()

// After  
this.translationService.getCurrentLanguage()
```

### Form Components
```html
<!-- Before -->
<label>البريد الإلكتروني</label>

<!-- After -->
<label>{{ 'auth.login.email' | translate }}</label>
```

## 🔧 Advanced Configuration

### Custom Translation Loader
```typescript
export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // Custom loading logic
    return this.http.get(`/api/translations/${lang}`);
  }
}
```

### Missing Translation Handler
```typescript
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    return `Missing: ${params.key}`;
  }
}
```

## 📊 Performance Optimization

### Lazy Loading Translation Files
```typescript
// Load translations on demand
this.translationService.get('section.key').pipe(
  take(1)
).subscribe(translation => {
  // Use translation
});
```

### Preload Critical Translations
```typescript
// Preload important sections
this.translationService.getMultiple([
  'common.submit',
  'common.cancel',
  'navigation.home'
]).subscribe(translations => {
  // Cache critical translations
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Translation not updating**: Ensure pipes are impure or subscribe to language changes
2. **Missing translations**: Check browser network tab for HTTP loader requests
3. **Direction issues**: Verify document direction is set correctly
4. **Form validation**: Ensure FormErrorComponent uses TranslationService

### Debug Mode
```typescript
// Enable translation debugging
this.translationService.get('debug.enabled').subscribe(debug => {
  if (debug) {
    console.log('Current language:', this.translationService.getCurrentLanguage());
  }
});
```

This comprehensive translation system provides a solid foundation for building multilingual Angular applications with proper Arabic and English support, including RTL/LTR handling and form validation integration.
