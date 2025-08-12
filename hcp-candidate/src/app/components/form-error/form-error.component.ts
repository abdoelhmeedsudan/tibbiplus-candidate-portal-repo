import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
        return `${fieldDisplayName} مطلوب`;
      
      case 'email':
        return 'يرجى إدخال بريد إلكتروني صحيح';
      
      case 'minlength':
        return `${fieldDisplayName} يجب أن يحتوي على ${errorValue.requiredLength} أحرف على الأقل`;
      
      case 'maxlength':
        return `${fieldDisplayName} يجب ألا يتجاوز ${errorValue.requiredLength} حرف`;
      
      case 'min':
        return `${fieldDisplayName} يجب أن يكون أكبر من أو يساوي ${errorValue.min}`;
      
      case 'max':
        return `${fieldDisplayName} يجب أن يكون أصغر من أو يساوي ${errorValue.max}`;
      
      case 'pattern':
        return this.getPatternErrorMessage();
      
      case 'passwordMismatch':
        return 'كلمات المرور غير متطابقة';
      
      case 'requiredTrue':
        return 'يجب الموافقة على الشروط والأحكام';
      
      case 'phoneNumber':
        return 'يرجى إدخال رقم هاتف صحيح';
      
      case 'dateInvalid':
        return 'يرجى إدخال تاريخ صحيح';
      
      case 'futureDate':
        return 'التاريخ يجب أن يكون في المستقبل';
      
      case 'pastDate':
        return 'التاريخ يجب أن يكون في الماضي';
      
      case 'age':
        return `العمر يجب أن يكون بين ${errorValue.min} و ${errorValue.max} سنة`;
      
      case 'uniqueEmail':
        return 'هذا البريد الإلكتروني مُستخدم بالفعل';
      
      case 'strongPassword':
        return 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم ورمز خاص';
      
      default:
        return `${fieldDisplayName} غير صحيح`;
    }
  }

  private getFieldDisplayName(): string {
    const arabicFieldNames: { [key: string]: string } = {
      'firstName': 'الاسم الأول',
      'lastName': 'اسم العائلة',
      'fullName': 'الاسم الكامل',
      'email': 'البريد الإلكتروني',
      'phone': 'رقم الهاتف',
      'password': 'كلمة المرور',
      'confirmPassword': 'تأكيد كلمة المرور',
      'dateOfBirth': 'تاريخ الميلاد',
      'address': 'العنوان',
      'city': 'المدينة',
      'country': 'الدولة',
      'jobTitle': 'المسمى الوظيفي',
      'company': 'الشركة',
      'experience': 'الخبرة',
      'salary': 'الراتب',
      'description': 'الوصف',
      'skills': 'المهارات',
      'education': 'التعليم',
      'certification': 'الشهادة',
      'specialization': 'التخصص',
      'department': 'القسم',
      'agreeToTerms': 'الموافقة على الشروط',
      'acceptPrivacy': 'قبول سياسة الخصوصية'
    };

    return arabicFieldNames[this.fieldName] || this.fieldName;
  }

  private getPatternErrorMessage(): string {
    switch (this.fieldName) {
      case 'phone':
        return 'يرجى إدخال رقم هاتف صحيح (مثال: +966501234567)';
      case 'nationalId':
        return 'يرجى إدخال رقم هوية صحيح';
      case 'postalCode':
        return 'يرجى إدخال رمز بريدي صحيح';
      default:
        return `تنسيق ${this.getFieldDisplayName()} غير صحيح`;
    }
  }
}
