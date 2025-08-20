import { Component, Input, inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="shouldShowError" 
      class="text-red-500 text-sm mt-1 transition-opacity duration-200"
      [class.opacity-100]="shouldShowError"
      [class.opacity-0]="!shouldShowError"
    >
      <i class="fas fa-exclamation-circle mr-1"></i>
      {{ errorMessage }}
    </div>
  `,
  styles: [`
    .transition-opacity {
      transition-property: opacity;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 200ms;
    }
  `]
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = '';
  @Input() customErrorMessages: { [key: string]: string } = {};

  private translationService = inject(TranslationService);

  public get shouldShowError(): boolean {
    return !!(this.control && this.control.invalid && this.control.touched);
  }

  public get errorMessage(): string {
    if (!this.control || !this.control.errors) {
      return '';
    }

    const errors = this.control.errors;
    const firstErrorKey = Object.keys(errors)[0];

    // Check for custom error messages first
    if (this.customErrorMessages[firstErrorKey]) {
      return this.customErrorMessages[firstErrorKey];
    }

    // Default error messages
    return this.getDefaultErrorMessage(firstErrorKey, errors[firstErrorKey]);
  }

  private getDefaultErrorMessage(errorKey: string, errorValue: any): string {
    const fieldDisplayName = this.getFieldDisplayName();

    switch (errorKey) {
      case 'required':
        return this.translationService.getValidationMessage('required');
      
      case 'email':
        return this.translationService.getValidationMessage('email');
      
      case 'minlength':
        return this.translationService.getValidationMessage('minlength', { min: errorValue.requiredLength });
      
      case 'maxlength':
        return this.translationService.getValidationMessage('maxlength', { max: errorValue.requiredLength });
      
      case 'min':
        return this.translationService.getValidationMessage('min');
      
      case 'max':
        return this.translationService.getValidationMessage('max');
      
      case 'pattern':
        return this.getPatternErrorMessage();
      
      case 'passwordMismatch':
        return this.translationService.getValidationMessage('password_mismatch');
      
      case 'requiredTrue':
        return this.translationService.getValidationMessage('required');
      
      case 'phoneNumber':
        return this.translationService.getValidationMessage('phone');
      
      case 'dateInvalid':
        return this.translationService.getValidationMessage('pattern');
      
      case 'futureDate':
        return this.translationService.getValidationMessage('pattern');
      
      case 'pastDate':
        return this.translationService.getValidationMessage('pattern');
      
      case 'age':
        return this.translationService.getValidationMessage('pattern');
      
      case 'uniqueEmail':
        return this.translationService.getValidationMessage('email');
      
      case 'strongPassword':
        return this.translationService.getValidationMessage('strong_password');
      
      default:
        return this.translationService.getValidationMessage('pattern');
    }
  }

  private getFieldDisplayName(): string {
    return this.translationService.getFieldName(this.fieldName);
  }

  private getPatternErrorMessage(): string {
    switch (this.fieldName) {
      case 'phone':
        return this.translationService.getValidationMessage('phone');
      case 'nationalId':
        return this.translationService.getValidationMessage('national_id');
      case 'postalCode':
        return this.translationService.getValidationMessage('pattern');
      default:
        return this.translationService.getValidationMessage('pattern');
    }
  }
}
