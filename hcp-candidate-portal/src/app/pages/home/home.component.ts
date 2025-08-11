import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { StatisticsSectionComponent } from '../../components/statistics-section/statistics-section.component';
import { NewsSectionComponent } from '../../components/news-section/news-section.component';
import { QuickLinksComponent } from '../../components/quick-links/quick-links.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeroSectionComponent,
    StatisticsSectionComponent,
    NewsSectionComponent,
    QuickLinksComponent
  ],
  template: `
    <div class="min-h-screen bg-white">
      <app-news-section />
      <app-hero-section />
      <app-quick-links />
      <app-statistics-section />
      
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">
              {{ isRTL() ? "لماذا تختار منصة ميدكونيكت؟" : "Why Choose MedConnect Platform?" }}
            </h2>
            
            <div class="grid md:grid-cols-3 gap-8">
              <div class="p-6 rounded-lg bg-blue-50">
                <div class="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  {{ isRTL() ? "منصة متخصصة" : "Specialized Platform" }}
                </h3>
                <p class="text-gray-600">
                  {{ isRTL() 
                    ? "نركز فقط على القطاع الصحي في المملكة، مما يعني فرصًا وظيفية وخدمات أكثر تخصصًا وملاءمة لاحتياجاتك."
                    : "We focus exclusively on the healthcare sector in the Kingdom, meaning more specialized and relevant job opportunities and services for your needs."
                  }}
                </p>
              </div>
              
              <div class="p-6 rounded-lg bg-blue-50">
                <div class="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  {{ isRTL() ? "توفير الوقت" : "Time Saving" }}
                </h3>
                <p class="text-gray-600">
                  {{ isRTL() 
                    ? "نقدم حلولًا متكاملة للباحثين عن عمل وأصحاب المنشآت الطبية، مما يوفر الوقت والجهد في عملية التوظيف."
                    : "We provide integrated solutions for job seekers and healthcare facility owners, saving time and effort in the hiring process."
                  }}
                </p>
              </div>
              
              <div class="p-6 rounded-lg bg-blue-50">
                <div class="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  {{ isRTL() ? "خدمات متنوعة" : "Diverse Services" }}
                </h3>
                <p class="text-gray-600">
                  {{ isRTL() 
                    ? "نقدم خدمات متكاملة تشمل التوظيف الطبي، تسويق العقارات الطبية، وربط المستثمرين بالفرص المناسبة."
                    : "We provide integrated services including medical recruitment, medical real estate marketing, and connecting investors with suitable opportunities."
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private translateService = inject(TranslateService);
  private languageService = inject(LanguageService);
  
  readonly isRTL = this.languageService.getIsRTL();

  ngOnInit(): void {
    // Update page title on component mount
    this.translateService.get('navigation.home').subscribe(title => {
      document.title = `${title} | MedConnect.sa`;
    });
  }
}
