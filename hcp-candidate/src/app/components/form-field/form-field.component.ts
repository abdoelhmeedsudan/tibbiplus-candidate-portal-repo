import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormErrorComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
  template: `
    <div class="form-group">
      <!-- Label -->
      <label 
        *ngIf="label" 
        [for]="inputId" 
        class="block text-sm font-medium text-gray-700 mb-2"
        [class.required]="required"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>

      <!-- Input Container -->
      <div class="relative" [class]="containerClass">
        <!-- Icon -->
        <i 
          *ngIf="icon" 
          [class]="'fas fa-' + icon + ' absolute right-3 top-3 text-gray-400'"
        ></i>

        <!-- Input Field -->
        <input
          [id]="inputId"
          [type]="getInputType()"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
          [value]="value"
          class="w-full py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          [class]="getInputClasses()"
        />

        <!-- Show/Hide Password Button -->
        <button
          *ngIf="type === 'password' && showPasswordToggle"
          type="button"
          (click)="togglePasswordVisibility()"
          class="absolute left-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>

        <!-- Clear Button -->
        <button
          *ngIf="clearable && value && !disabled"
          type="button"
          (click)="clearValue()"
          class="absolute left-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Help Text -->
      <div *ngIf="helpText" class="text-xs text-gray-500 mt-1">
        {{ helpText }}
      </div>

      <!-- Error Display -->
      <app-form-error
        [control]="control"
        [fieldName]="fieldName"
        [customErrorMessages]="customErrorMessages"
      ></app-form-error>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1rem;
    }

    .required::after {
      content: ' *';
      color: #ef4444;
    }

    .input-with-icon {
      padding-right: 2.5rem;
    }

    .input-with-action {
      padding-left: 2.5rem;
    }

    .transition-all {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 200ms;
    }

    .focus-within\:ring-2:focus-within {
      --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
      --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    }
  `]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() fieldName: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() helpText: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() clearable: boolean = false;
  @Input() showPasswordToggle: boolean = false;
  @Input() control: AbstractControl | null = null;
  @Input() customErrorMessages: { [key: string]: string } = {};
  @Input() containerClass: string = '';

  public value: string = '';
  public showPassword: boolean = false;
  public inputId: string = '';

  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnInit() {
    this.inputId = this.fieldName || `input-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onInput(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
    // Can be used for custom focus behavior
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    // You would need to update the input type dynamically in a real implementation
  }

  clearValue(): void {
    this.value = '';
    this.onChange('');
  }

  getInputType(): string {
    if (this.type === 'password' && this.showPasswordToggle && this.showPassword) {
      return 'text';
    }
    return this.type;
  }

  getInputClasses(): string {
    const baseClasses = 'px-4';
    const iconPadding = this.icon ? 'pr-12' : 'pr-4';
    const actionPadding = (this.showPasswordToggle && this.type === 'password') || this.clearable ? 'pl-12' : 'pl-4';
    
    let validationClasses = '';
    if (this.control) {
      if (this.control.invalid && this.control.touched) {
        validationClasses = 'border-red-500 focus:ring-red-500 focus:border-red-500';
      } else {
        validationClasses = 'border-gray-300';
      }
    } else {
      validationClasses = 'border-gray-300';
    }

    return `${baseClasses} ${iconPadding} ${actionPadding} ${validationClasses}`;
  }
}
