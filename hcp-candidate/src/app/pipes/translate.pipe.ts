import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Make it impure to react to language changes
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService);

  transform(key: string, interpolateParams?: any): string {
    return this.translationService.instant(key, interpolateParams);
  }
}

@Pipe({
  name: 'translateField',
  standalone: true,
  pure: false
})
export class TranslateFieldPipe implements PipeTransform {
  private translationService = inject(TranslationService);

  transform(fieldKey: string): string {
    return this.translationService.getFieldName(fieldKey);
  }
}

@Pipe({
  name: 'translateValidation',
  standalone: true,
  pure: false
})
export class TranslateValidationPipe implements PipeTransform {
  private translationService = inject(TranslationService);

  transform(validationType: string, params?: any): string {
    return this.translationService.getValidationMessage(validationType, params);
  }
}
