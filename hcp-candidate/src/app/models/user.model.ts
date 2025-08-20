export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  isActive?: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  firstNameEn?: string;
  lastNameEn?: string;
  dateOfBirth?: string;
  gender?: string;
  email: string;
  mobileNumber?: string;
  phoneNumber?: string;
  birthDate?: string;
  nationalityId?: string;
  countryId?: string;
  cityId?: string;
  maritalStatus?: string;
  address?: string;
  licenseNumber?: string;
  yearsOfExperience?: number;
  specialization?: string;
  jobTitleId?: string;
  medicalCouncilId?: string;
  medicalCouncilNumber?: string;
  medicalCouncilRegistrationDate?: string;
  userName?: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// Simple registration request for frontend form
export interface SimpleRegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Lookup interfaces
export interface JobTitle {
  id: string;
  name: string;
  nameEn: string;
}

export interface Nationality {
  id: string;
  name: string;
  nameEn: string;
}

export interface City {
  id: string;
  name: string;
  nameEn: string;
  countryId?: string;
}

export interface MedicalCouncil {
  id: string;
  name: string;
  nameEn: string;
  countryId?: string;
}
