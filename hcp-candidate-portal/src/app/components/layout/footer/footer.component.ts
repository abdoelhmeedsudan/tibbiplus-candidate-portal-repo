import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <footer class="bg-blue-900 text-white">
      <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">MedConnect.sa</h3>
            <p class="text-blue-200 text-sm">
              {{ isRTL() 
                ? "منصة متخصصة في ربط الكوادر الطبية بالمنشآت الصحية وتوفير حلول ذات قيمة للقطاع الصحي في المملكة العربية السعودية."
                : "A specialized platform connecting medical professionals with healthcare facilities and providing valuable solutions for the healthcare sector in Saudi Arabia."
              }}
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">
              {{ isRTL() ? "روابط سريعة" : "Quick Links" }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a routerLink="/jobs" class="text-blue-200 hover:text-white text-sm">
                  {{ isRTL() ? "وظائف طبية" : "Medical Jobs" }}
                </a>
              </li>
              <li>
                <a routerLink="/jobs?specialty=dental" class="text-blue-200 hover:text-white text-sm">
                  {{ isRTL() ? "فنيي الأسنان" : "Dental Technicians" }}
                </a>
              </li>
              <li>
                <a routerLink="/jobs?specialty=engineering" class="text-blue-200 hover:text-white text-sm">
                  {{ isRTL() ? "مهندسو الأجهزة الطبية" : "Medical Device Engineers" }}
                </a>
              </li>
              <li>
                <a routerLink="/clinics" class="text-blue-200 hover:text-white text-sm">
                  {{ isRTL() ? "المجمعات الطبية" : "Medical Clinics" }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">
              {{ isRTL() ? "تواصل معنا" : "Contact Us" }}
            </h3>
            <ul class="space-y-2">
              <li class="flex items-center text-sm">
                <svg [class]="'h-4 w-4 ' + (isRTL() ? 'ml-2' : 'mr-2')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-blue-200">+966 12 345 6789</span>
              </li>
              <li class="flex items-center text-sm">
                <svg [class]="'h-4 w-4 ' + (isRTL() ? 'ml-2' : 'mr-2')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-blue-200">info@medconnect.sa</span>
              </li>
              <li class="flex items-center text-sm">
                <svg [class]="'h-4 w-4 ' + (isRTL() ? 'ml-2' : 'mr-2')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-blue-200">
                  {{ isRTL() ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia" }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Social Media -->
          <div>
            <h3 class="text-lg font-semibold mb-4">
              {{ isRTL() ? "تابعنا" : "Follow Us" }}
            </h3>
            <div class="flex space-x-4">
              <a href="#" class="text-blue-200 hover:text-white">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-blue-200 hover:text-white">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-blue-200 hover:text-white">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" class="text-blue-200 hover:text-white">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-blue-800">
          <p class="text-center text-blue-200 text-sm">
            &copy; {{ currentYear }} MedConnect.sa - {{ 'footer.copyright' | translate }}
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private languageService = inject(LanguageService);
  
  readonly isRTL = this.languageService.getIsRTL();
  readonly currentYear = new Date().getFullYear();
}
