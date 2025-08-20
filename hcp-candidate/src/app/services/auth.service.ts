import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordRequest,
  User 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  private readonly endpoint = 'Auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.initializeAuth();
  }

  /**
   * Initialize authentication state
   */
  private initializeAuth(): void {
    const token = this.getToken();
    if (token) {
      this.setAuthHeader(token);
      // Optionally verify token validity
      this.verifyToken().subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.logout()
      });
    }
  }

  /**
   * Login user
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.post<LoginResponse>(`${this.endpoint}/login`, credentials)
      .pipe(
        tap(response => {
          this.storeTokens(response.token, response.refreshToken);
          this.setAuthHeader(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  /**
   * Register new user
   */
  register(userData: RegisterRequest): Observable<LoginResponse> {
    return this.post<LoginResponse>(`${this.endpoint}/Registration`, userData)
      .pipe(
        tap(response => {
          this.storeTokens(response.token, response.refreshToken);
          this.setAuthHeader(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  /**
   * Logout user
   */
  logout(): Observable<void> | void {
    const token = this.getToken();
    
    // Clear local state first
    this.clearTokens();
    this.removeAuthHeader();
    this.currentUserSubject.next(null);

    // Optionally call logout endpoint
    if (token) {
      return this.post<void>(`${this.endpoint}/logout`, {});
    }
  }

  /**
   * Request password reset
   */
  requestPasswordReset(email: PasswordResetRequest): Observable<void> {
    return this.post<void>(`${this.endpoint}/password-reset`, email);
  }

  /**
   * Confirm password reset
   */
  confirmPasswordReset(data: PasswordResetConfirm): Observable<void> {
    return this.post<void>(`${this.endpoint}/password-reset/confirm`, data);
  }

  /**
   * Change password
   */
  changePassword(data: ChangePasswordRequest): Observable<void> {
    return this.post<void>(`${this.endpoint}/change-password`, data);
  }

  /**
   * Verify token validity
   */
  verifyToken(): Observable<User> {
    return this.get<User>(`${this.endpoint}/verify`);
  }

  /**
   * Refresh access token
   */
  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.post<LoginResponse>(`${this.endpoint}/refresh`, { refreshToken })
      .pipe(
        tap(response => {
          this.storeTokens(response.token, response.refreshToken);
          this.setAuthHeader(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.currentUserSubject.value;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  /**
   * Get stored refresh token
   */
  getRefreshToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.refreshTokenKey);
    }
    return null;
  }

  /**
   * Store tokens
   */
  private storeTokens(token: string, refreshToken?: string): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      if (refreshToken) {
        localStorage.setItem(this.refreshTokenKey, refreshToken);
      }
    }
  }

  /**
   * Clear stored tokens
   */
  private clearTokens(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.refreshTokenKey);
    }
  }
}
