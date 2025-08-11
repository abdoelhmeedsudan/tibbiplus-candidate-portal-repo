import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Health Candidate Portal');
  
  private translateService = inject(TranslateService);
  private languageService = inject(LanguageService);

  ngOnInit(): void {
    // Initialize the language service
    this.languageService.setLanguage(this.languageService.getCurrentLanguage()());
  }
}
