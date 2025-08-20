import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// Import translation files directly
import { arTranslations } from '../assets/translations/ar';
import { enTranslations } from '../assets/translations/en';

// Direct translation loader that uses imported files (no HTTP calls)
export class DirectTranslateLoader implements TranslateLoader {
  private translations: { [key: string]: any } = {
    'ar': arTranslations,
    'en': enTranslations
  };

  getTranslation(lang: string): Observable<any> {
    const translation = this.translations[lang] || this.translations['ar'];
    console.log(`Loading ${lang} translations directly from imported files`);
    return of(translation);
  }
}

// Translation loader factory
export function DirectLoaderFactory(): DirectTranslateLoader {
  return new DirectTranslateLoader();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: DirectLoaderFactory,
          deps: []
        },
        fallbackLang: 'ar'
      })
    )
  ]
};
