import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Footer, Header, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  public languageService = inject(LanguageService);

  public get direction(): 'rtl' | 'ltr' {
    return this.languageService.direction;
  }

  public get isRTL(): boolean {
    return this.languageService.isRTL;
  }
}
