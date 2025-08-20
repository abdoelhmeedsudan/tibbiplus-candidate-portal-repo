import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayout } from "./layouts/main-layout/main-layout";
import { TranslationService } from './services/translation.service';
import { LanguageService } from './services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('hcp-candidate');
  private translationService = inject(TranslationService);
  private languageService = inject(LanguageService);

  ngOnInit(): void {
    // Initialize translation service
    // The service will automatically load the saved language or default to Arabic
    this.translationService.detectBrowserLanguage();
  }
}
