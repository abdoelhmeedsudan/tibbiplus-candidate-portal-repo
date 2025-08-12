import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          return this.handle401Error(req, next);
        }

        // Handle 403 Forbidden errors
        if (error.status === 403) {
          console.error('Access forbidden');
          this.authService.logout();
        }

        // Handle 500 Internal Server Error
        if (error.status === 500) {
          console.error('Server error occurred');
        }

        // Handle network errors
        if (error.status === 0) {
          console.error('Network error - check your internet connection');
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Try to refresh token
    const refreshToken = this.authService.getRefreshToken();
    
    if (refreshToken && !request.url.includes('refresh')) {
      return this.authService.refreshToken().pipe(
        switchMap(() => {
          // Retry the original request with new token
          const newToken = this.authService.getToken();
          const newRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });
          return next.handle(newRequest);
        }),
        catchError((refreshError) => {
          // Refresh failed, logout user
          this.authService.logout();
          return throwError(() => refreshError);
        })
      );
    } else {
      // No refresh token or refresh failed, logout
      this.authService.logout();
      return throwError(() => new Error('Authentication failed'));
    }
  }
}
