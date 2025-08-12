# Form Validation Components Documentation

## Overview

This project includes generic, reusable form validation components that provide consistent error handling and display across all forms in the application.

## Components

### 1. FormErrorComponent

**Purpose**: Displays validation error messages for form controls with Arabic translations.

**Usage**:
```html
<app-form-error
  [control]="myForm.get('fieldName')"
  fieldName="email"
  [customErrorMessages]="{ required: 'هذا الحقل مطلوب' }"
></app-form-error>
```

**Features**:
- Automatic Arabic error message translations
- Custom error message support
- Field name mapping to Arabic display names
- Visual feedback with icons and animations
- Support for common validation patterns (email, phone, nationalId, etc.)

**Input Properties**:
- `control: AbstractControl | null` - The form control to validate
- `fieldName: string` - The field name for error message mapping
- `customErrorMessages: { [key: string]: string }` - Custom error messages override

### 2. FormFieldComponent

**Purpose**: A complete form field wrapper that includes input, label, icon, validation, and error display.

**Usage**:
```html
<app-form-field
  label="البريد الإلكتروني"
  fieldName="email"
  type="email"
  [required]="true"
  icon="envelope"
  placeholder="أدخل بريدك الإلكتروني"
  helpText="مثال: user@example.com"
  [control]="registrationForm.get('email')"
  [customErrorMessages]="{ email: 'البريد الإلكتروني غير صالح' }"
></app-form-field>
```

**Features**:
- Complete form field with label, input, icon, and error display
- Password toggle functionality
- Clear button for clearable fields
- Automatic validation state styling
- RTL/LTR support
- Icon positioning
- Help text support

**Input Properties**:
- `label: string` - Field label
- `fieldName: string` - Field name for validation
- `type: string` - Input type (text, email, password, tel, etc.)
- `placeholder: string` - Input placeholder
- `icon: string` - FontAwesome icon name
- `helpText: string` - Help text displayed below field
- `required: boolean` - Whether field is required
- `disabled: boolean` - Whether field is disabled
- `readonly: boolean` - Whether field is readonly
- `clearable: boolean` - Whether to show clear button
- `showPasswordToggle: boolean` - Whether to show password toggle
- `control: AbstractControl | null` - Form control
- `customErrorMessages: { [key: string]: string }` - Custom error messages
- `containerClass: string` - Additional CSS classes for container

## Error Message Mapping

### Default Arabic Error Messages

```typescript
const errorMessages = {
  required: 'هذا الحقل مطلوب',
  email: 'يرجى إدخال بريد إلكتروني صحيح',
  minlength: 'عدد الأحرف أقل من المطلوب',
  maxlength: 'عدد الأحرف أكثر من المسموح',
  pattern: 'تنسيق البيانات غير صحيح',
  min: 'القيمة أقل من المسموح',
  max: 'القيمة أكثر من المسموح',
  strongPassword: 'كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم',
  passwordMismatch: 'كلمات المرور غير متطابقة'
};
```

### Field Name Mapping

```typescript
const fieldNames = {
  firstName: 'الاسم الأول',
  lastName: 'الاسم الأخير',
  email: 'البريد الإلكتروني',
  phone: 'رقم الهاتف',
  password: 'كلمة المرور',
  confirmPassword: 'تأكيد كلمة المرور',
  nationalId: 'رقم الهوية'
};
```

### Specific Pattern Errors

```typescript
const patternErrors = {
  phone: 'يرجى إدخال رقم هاتف صحيح (05xxxxxxxx)',
  nationalId: 'يرجى إدخال رقم هوية صحيح (10 أرقام)',
  email: 'يرجى إدخال بريد إلكتروني صحيح'
};
```

## Implementation Examples

### 1. Registration Form with FormFieldComponent

```typescript
// registration.component.ts
import { FormFieldComponent } from '../../components/form-field/form-field.component';

@Component({
  imports: [FormFieldComponent, FormErrorComponent, ...],
  // ...
})
export class RegistrationComponent {
  registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
    // ...
  });
}
```

```html
<!-- registration.component.html -->
<form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
  <app-form-field
    label="الاسم الأول"
    fieldName="firstName"
    [required]="true"
    icon="user"
    placeholder="أدخل اسمك الأول"
    [control]="registrationForm.get('firstName')"
  ></app-form-field>

  <app-form-field
    label="البريد الإلكتروني"
    fieldName="email"
    type="email"
    [required]="true"
    icon="envelope"
    placeholder="أدخل بريدك الإلكتروني"
    [control]="registrationForm.get('email')"
  ></app-form-field>
  
  <!-- More fields... -->
</form>
```

### 2. Manual Error Display with FormErrorComponent

```html
<div class="form-group">
  <label for="email">البريد الإلكتروني</label>
  <input 
    id="email" 
    formControlName="email" 
    type="email"
    class="form-control"
  />
  
  <!-- Manual error display -->
  <app-form-error
    [control]="myForm.get('email')"
    fieldName="email"
  ></app-form-error>
</div>
```

### 3. Custom Error Messages

```html
<app-form-field
  label="كلمة المرور"
  fieldName="password"
  type="password"
  [control]="form.get('password')"
  [customErrorMessages]="{
    minlength: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    strongPassword: 'يجب أن تحتوي على حرف كبير وصغير ورقم'
  }"
></app-form-field>
```

### 4. Form-Level Validation

```html
<!-- Display form-level errors -->
<app-form-error
  *ngIf="form.errors?.['passwordMismatch'] && form.get('confirmPassword')?.touched"
  [control]="null"
  fieldName="form"
  [customErrorMessages]="{ passwordMismatch: 'كلمات المرور غير متطابقة' }"
></app-form-error>
```

## Styling

The components use Tailwind CSS classes and include:

- **Visual States**: Border colors change based on validation state
- **Icons**: FontAwesome icons for visual feedback
- **Animations**: Smooth transitions for better UX
- **RTL Support**: Proper positioning for Arabic text
- **Responsive**: Mobile-friendly layouts

## Benefits

1. **Consistency**: All forms use the same error display patterns
2. **Localization**: Built-in Arabic error messages
3. **Reusability**: Same components work across different forms
4. **Maintainability**: Error message changes in one place
5. **User Experience**: Better visual feedback and interactions
6. **Accessibility**: Proper labeling and error associations

## Migration Guide

To migrate existing forms to use these components:

1. Import `FormErrorComponent` and/or `FormFieldComponent`
2. Replace manual error display with `<app-form-error>`
3. Replace form fields with `<app-form-field>` for complete solution
4. Remove duplicate validation logic
5. Test with different validation scenarios

## Testing

Test scenarios to verify:

1. Required field validation
2. Email format validation
3. Phone number pattern validation
4. Password strength validation
5. Password confirmation matching
6. Custom error messages display
7. Form-level validation errors
8. Visual state changes
9. Accessibility with screen readers
10. RTL text display
