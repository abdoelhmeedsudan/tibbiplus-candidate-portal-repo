import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LookupService, JobTitle, Nationality, City, MedicalCouncil, Country } from '../../services/lookup.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageService } from '../../services/language.service';
import { SimpleRegisterRequest, RegisterRequest } from '../../models';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    TranslateModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Lookup data
  jobTitles: JobTitle[] = [];
  nationalities: Nationality[] = [];
  countries: Country[] = [];
  cities: City[] = [];
  medicalCouncils: MedicalCouncil[] = [];
  isLoadingLookups = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private lookupService: LookupService,
    private translationService: TranslationService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.registrationForm = this.createForm();
  }

    ngOnInit(): void {
    this.loadLookupData();
  }

  private loadLookupData(): void {
    this.isLoadingLookups = true;
    
    forkJoin({
      jobTitles: this.lookupService.getJobTitles(),
      nationalities: this.lookupService.getNnationalities(),
      cities: this.lookupService.getCities(),
      medicalCouncils: this.lookupService.getMedicalCouncils(),
      countries: this.lookupService.getCountries()
    }).subscribe({
      next: (data) => {
        this.jobTitles = data.jobTitles;
        this.nationalities = data.nationalities;
        this.countries = data.countries;
        this.cities = data.cities;
        this.medicalCouncils = data.medicalCouncils;
        this.isLoadingLookups = false;
      },
      error: (error) => {
        console.error('Error loading lookup data:', error);
        this.isLoadingLookups = false;
        // Set default empty arrays so form still works
        this.jobTitles = [];
        this.nationalities = [];
        this.countries = [];
        this.cities = [];
        this.medicalCouncils = [];
      }
    });
  }

  onCountryChange(event: any): void {
    const countryId = event.target.value;
    if (countryId) {
      // Filter cities based on selected country
      // For now, we'll show all cities, but in a real app you'd filter by country
      this.registrationForm.get('cityId')?.setValue('');
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // Basic Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstNameEn: ['', [Validators.required, Validators.minLength(2)]],
      lastNameEn: ['', [Validators.required, Validators.minLength(2)]],
      firstNameAr: ['', [Validators.required, Validators.minLength(2)]],
      lastNameAr: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      
      // Contact Information
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
      
      // Personal Information
      birthDate: ['', [Validators.required]],
      nationalityId: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      address: ['', [Validators.required]],
      licenseNumber: ['', [Validators.required]],
      yearsOfExperience: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      
      // Professional Information
      jobTitleId: ['', [Validators.required]],
      medicalCouncilId: ['', [Validators.required]],
      medicalCouncilNumber: ['', [Validators.required]],
      medicalCouncilRegistrationDate: ['', [Validators.required]],
      
      // Account Information
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  // Strong password validator
  private strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber;
    return !passwordValid ? { strongPassword: true } : null;
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const simpleData: SimpleRegisterRequest = {
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        confirmPassword: this.registrationForm.value.confirmPassword,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        phone: this.registrationForm.value.phone,
        agreeToTerms: this.registrationForm.value.agreeToTerms
      };

      // Convert simple form data to full API request format
      const registerData: RegisterRequest = this.convertToRegisterRequest(this.registrationForm.value);

      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.successMessage = this.translationService.getMessage('success', 'registration');
          
          // Redirect to login after successful registration
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = error.error?.message || this.translationService.getMessage('errors', 'registration');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private convertToRegisterRequest(formData: any): RegisterRequest {
    // Pass all form controls directly, mapping/renaming where necessary
    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      firstNameEn: formData.firstNameEn,
      lastNameEn: formData.lastNameEn,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      phoneNumber: formData.phoneNumber,
      birthDate: formData.birthDate,
      nationalityId: formData.nationalityId,
      countryId: formData.countryId,
      cityId: formData.cityId,
      maritalStatus: formData.maritalStatus,
      address: formData.address,
      licenseNumber: formData.licenseNumber,
      yearsOfExperience: formData.yearsOfExperience,
      specialization: formData.specialization,
      jobTitleId: formData.jobTitleId,
      medicalCouncilId: formData.medicalCouncilId,
      medicalCouncilNumber: formData.medicalCouncilNumber,
      medicalCouncilRegistrationDate: formData.medicalCouncilRegistrationDate,
      userName: formData.userName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      agreeToTerms: formData.agreeToTerms
    };
  }

  private markFormGroupTouched() {
    Object.keys(this.registrationForm.controls).forEach(key => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);
    if (field && field.errors && field.touched) {
      const errors = field.errors;
      
      if (errors['required']) {
        return this.translationService.getValidationMessage('required');
      }
      if (errors['email']) {
        return this.translationService.getValidationMessage('email');
      }
      if (errors['minlength']) {
        return this.translationService.getValidationMessage('minlength', { 
          min: errors['minlength'].requiredLength 
        });
      }
      if (errors['pattern']) {
        if (fieldName === 'phone') {
          return this.translationService.getValidationMessage('phone');
        }
        return this.translationService.getValidationMessage('pattern');
      }
      if (errors['strongPassword']) {
        return this.translationService.getValidationMessage('strong_password');
      }
      if (errors['passwordMismatch']) {
        return this.translationService.getValidationMessage('password_mismatch');
      }
    }
    return '';
  }

  // Translation helper methods
  getTranslation(key: string): string {
    return this.translationService.instant(key);
  }

  getAuthTranslation(section: string, key: string): string {
    return this.translationService.getAuthText(section, key);
  }

  getPlaceholder(key: string): string {
    return this.translationService.getPlaceholder(key);
  }
}
