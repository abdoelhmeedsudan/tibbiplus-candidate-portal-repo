# Language Service Documentation

## 🌐 **Multi-language Support with RTL/LTR Direction**

The Language Service provides comprehensive support for Arabic (RTL) and English (LTR) languages with automatic direction handling.

## 📁 **File Structure**

```
src/app/
├── services/
│   └── language.service.ts              # Core language service
├── components/
│   └── language-switcher/
│       └── language-switcher.component.ts  # Language toggle component
└── styles.css                           # RTL/LTR global styles
```

## 🚀 **Features**

✅ **Automatic Language Detection** - Detects browser language preference  
✅ **Local Storage Persistence** - Remembers user's language choice  
✅ **RTL/LTR Direction** - Automatic HTML direction switching  
✅ **Document Attributes** - Updates `html[dir]` and `html[lang]` attributes  
✅ **Signal-based Reactivity** - Modern Angular signals for reactive updates  
✅ **SSR Compatible** - Works with server-side rendering  
✅ **Utility Methods** - Helper methods for direction-aware styling  

## 🔧 **Usage**

### **1. In Components**

```typescript
import { Component, inject } from '@angular/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-example',
  template: `
    <div [attr.dir]="languageService.direction">
      <h1>{{ isArabic ? 'مرحبا' : 'Welcome' }}</h1>
      <button (click)="languageService.toggleLanguage()">
        {{ isArabic ? 'English' : 'عربي' }}
      </button>
    </div>
  `
})
export class ExampleComponent {
  public languageService = inject(LanguageService);

  public get isArabic(): boolean {
    return this.languageService.isArabic;
  }
}
```

### **2. Service Methods**

```typescript
// Get current language info
languageService.currentLang          // 'ar' | 'en'
languageService.isArabic            // boolean
languageService.isEnglish           // boolean
languageService.direction           // 'rtl' | 'ltr'
languageService.isRTL              // boolean
languageService.isLTR              // boolean

// Language control
languageService.setLanguage('ar')   // Set specific language
languageService.toggleLanguage()    // Toggle between ar/en

// Utility methods
languageService.getDirectionClasses()              // 'rtl text-right' or 'ltr text-left'
languageService.getSpacingClass('margin', 'start', '4')  // 'mr-4' or 'ml-4' based on direction
languageService.getFloatClass('start')             // 'float-right' or 'float-left'
```

### **3. Template Usage**

```html
<!-- Direction-aware container -->
<div [attr.dir]="languageService.direction" [class]="languageService.isRTL ? 'rtl' : 'ltr'">
  
  <!-- Conditional content -->
  <h1>{{ languageService.isArabic ? 'العنوان بالعربية' : 'English Title' }}</h1>
  
  <!-- Direction-aware flexbox -->
  <div class="flex" [class]="languageService.isRTL ? 'flex-row-reverse' : 'flex-row'">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
  
  <!-- Direction-aware spacing -->
  <div class="flex items-center" [class]="languageService.isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'">
    <span>Text</span>
    <i class="fas fa-icon"></i>
  </div>
  
</div>
```

### **4. Language Switcher Component**

```html
<!-- Simple toggle button -->
<app-language-switcher></app-language-switcher>
```

The language switcher automatically:
- Shows current language in native script
- Toggles between Arabic and English
- Updates all components reactively
- Persists choice in localStorage

## 🎨 **CSS Classes for RTL Support**

The service works with pre-defined CSS classes in `styles.css`:

```css
/* Automatic direction classes */
.rtl { direction: rtl; }
.ltr { direction: ltr; }

/* Spacing with direction support */
.rtl .space-x-4 > * + * { margin-right: 1rem; margin-left: 0; }
.ltr .space-x-4 > * + * { margin-left: 1rem; margin-right: 0; }

/* Text alignment */
.rtl .text-left { text-align: right; }
.rtl .text-right { text-align: left; }

/* And many more... */
```

## 🌍 **Language Configuration**

Current supported languages:

```typescript
const languages = [
  {
    code: 'ar',
    name: 'Arabic', 
    nativeName: 'العربية',
    direction: 'rtl'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English', 
    direction: 'ltr'
  }
];
```

## 🔄 **How It Works**

1. **Initialization**: Service detects browser language or loads from localStorage
2. **Signal Updates**: Changes to language update the reactive signal
3. **DOM Updates**: Effect automatically updates `html` attributes and classes
4. **Component Reactions**: All components using the service update automatically
5. **Persistence**: New language choice is saved to localStorage

## 📱 **Responsive RTL Support**

The service includes mobile-specific RTL classes:

```css
@media (max-width: 768px) {
  .rtl .flex-col-reverse { flex-direction: column-reverse; }
}
```

## 🚀 **Implementation in Your App**

### **Updated Components:**

1. **Header Component** - Now includes language switcher and RTL-aware navigation
2. **Main Layout** - Sets document direction attributes
3. **Home Component** - Conditional Arabic/English content
4. **Language Switcher** - Toggle button component

### **Example Usage in Home Page:**

```html
<!-- Hero section with conditional text -->
<section [attr.dir]="direction">
  <h1>
    {{ isArabic ? 'مستقبلك المهني في القطاع الصحي' : 'Your Career Future in Healthcare' }}
  </h1>
  
  <!-- Direction-aware button -->
  <a routerLink="/auth/register" 
     class="flex items-center" 
     [class]="isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'">
    {{ isArabic ? 'سجل الآن' : 'Register Now' }}
    <i class="fas fa-chevron-left"></i>
  </a>
</section>
```

## 🎯 **Key Benefits**

- **Automatic Direction Handling** - No manual RTL/LTR management needed
- **Reactive Updates** - All components update when language changes
- **Persistent Choice** - User preference remembered across sessions  
- **SEO Friendly** - Proper HTML lang and dir attributes
- **Accessibility** - Screen readers get correct language and direction info
- **Tailwind Compatible** - Works seamlessly with Tailwind CSS classes

The language service is now fully integrated and ready to use! Switch between Arabic and English using the language switcher in the header. 🌍✨
