import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LanguageSwitcherComponent
  ],
  template: `
    <header class="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center group">
              <div class="relative">
                <svg class="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span [class]="'font-bold text-xl text-blue-600 group-hover:text-blue-700 transition-colors ' + (isRTL() ? 'mr-3' : 'ml-3')">
                Health Candidate Portal
              </span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-2">
            <a
              routerLink="/"
              routerLinkActive="text-blue-700 bg-blue-50 shadow-sm"
              [routerLinkActiveOptions]="{exact: true}"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {{ 'navigation.home' | translate }}
            </a>
            <a
              routerLink="/jobs"
              routerLinkActive="text-blue-700 bg-blue-50 shadow-sm"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
              </svg>
              {{ 'navigation.jobs' | translate }}
            </a>
            <a
              routerLink="/hire"
              routerLinkActive="text-blue-700 bg-blue-50 shadow-sm"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ 'navigation.hire' | translate }}
            </a>
            <a
              routerLink="/clinics"
              routerLinkActive="text-blue-700 bg-blue-50 shadow-sm"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {{ 'navigation.clinics' | translate }}
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="text-blue-700 bg-blue-50 shadow-sm"
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ 'navigation.contact' | translate }}
            </a>
            
            <div [class]="'flex items-center space-x-3 ' + (isRTL() ? 'ml-4' : 'mr-4')">
              <!-- Search Button -->
              <button class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <!-- Notifications -->
              <button class="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9a2.5 2.5 0 01-2.5 2.5z" />
                </svg>
                <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div class="w-px h-6 bg-gray-200"></div>
              
              <app-language-switcher />
              
              <!-- Profile Dropdown -->
              <div class="relative" #profileDropdown>
                <button
                  (click)="toggleProfileDropdown()"
                  class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  [attr.aria-label]="isProfileDropdownOpen() ? ('dropdown.closeMenu' | translate) : ('dropdown.openMenu' | translate)"
                >
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-2">
                    <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span class="hidden lg:block">{{ 'profile.dropdown.title' | translate }}</span>
                  <svg 
                    [class]="'w-4 h-4 ml-1 transition-transform duration-200 ' + (isProfileDropdownOpen() ? 'rotate-180' : '')"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                  *ngIf="isProfileDropdownOpen()"
                  [class]="'absolute mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 border border-gray-100 ' + (isRTL() ? 'left-0' : 'right-0')"
                >
                  <div class="py-2">
                    <div class="px-4 py-2 border-b border-gray-100">
                      <p class="text-sm font-medium text-gray-900">{{ 'profile.dropdown.title' | translate }}</p>
                      <p class="text-xs text-gray-500">إدارة حسابك</p>
                    </div>
                    <a
                      routerLink="/login"
                      class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      (click)="closeProfileDropdown()"
                    >
                      <svg class="w-4 h-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      {{ 'profile.dropdown.login' | translate }}
                    </a>
                    <a
                      routerLink="/register"
                      class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      (click)="closeProfileDropdown()"
                    >
                      <svg class="w-4 h-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      {{ 'profile.dropdown.register' | translate }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden space-x-2">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
              (click)="toggleMenu()"
            >
              <span class="sr-only">Open main menu</span>
              <svg *ngIf="isMenuOpen()" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <svg *ngIf="!isMenuOpen()" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div *ngIf="isMenuOpen()" class="md:hidden bg-white border-t border-gray-100 shadow-lg" id="mobile-menu">
        <div class="px-4 pt-4 pb-6 space-y-2">
          <a
            routerLink="/"
            routerLinkActive="text-blue-700 bg-blue-50 shadow-sm"
            [routerLinkActiveOptions]="{exact: true}"
            class="flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            (click)="toggleMenu()"
          >
            <svg class="w-5 h-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {{ 'navigation.home' | translate }}
          </a>
          
          <div class="pt-6 flex flex-col space-y-2">
            <app-language-switcher />
          </div>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  private languageService = inject(LanguageService);
  
  isMenuOpen = signal(false);
  isProfileDropdownOpen = signal(false);
  
  readonly isRTL = this.languageService.getIsRTL();

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen.update(value => !value);
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownOpen.set(false);
  }
}