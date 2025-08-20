import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginatedApiResponse } from '../models/common.model';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected readonly baseUrl = 'http://localhost:5158/api'; // Update with your API URL
  
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(protected http: HttpClient) {}

  /**
   * GET request
   */
  protected get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const options = params ? { ...this.httpOptions, params } : this.httpOptions;
    
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, options)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * GET request for paginated responses
   */
  protected getPaginated<T>(endpoint: string, params?: HttpParams): Observable<T[]> {
    const options = params ? { ...this.httpOptions, params } : this.httpOptions;
    
    return this.http.get<PaginatedApiResponse<T>>(`${this.baseUrl}/${endpoint}`, options)
      .pipe(
        map(response => response.data.items),
        catchError(this.handleError)
      );
  }

  /**
   * POST request
   */
  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * PUT request
   */
  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * DELETE request
   */
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * PATCH request
   */
  protected patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body, this.httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Set Authorization header
   */
  protected setAuthHeader(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
  }

  /**
   * Remove Authorization header
   */
  protected removeAuthHeader(): void {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || `Error Code: ${error.status}`;
    }

    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Build HTTP params from object
   */
  protected buildHttpParams(params: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    
    return httpParams;
  }
}
