import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  PaginatedResponse, 
  PaginationRequest 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {

  private readonly endpoint = 'users';

  /**
   * Get all users with pagination
   */
  getUsers(params?: PaginationRequest): Observable<PaginatedResponse<User>> {
    const httpParams = params ? this.buildHttpParams(params) : undefined;
    return this.get<PaginatedResponse<User>>(this.endpoint, httpParams);
  }

  /**
   * Get user by ID
   */
  getUserById(id: string): Observable<User> {
    return this.get<User>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new user
   */
  createUser(userData: CreateUserRequest): Observable<User> {
    return this.post<User>(this.endpoint, userData);
  }

  /**
   * Update user
   */
  updateUser(id: string, userData: UpdateUserRequest): Observable<User> {
    return this.put<User>(`${this.endpoint}/${id}`, userData);
  }

  /**
   * Delete user
   */
  deleteUser(id: string): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Get current user profile
   */
  getCurrentUser(): Observable<User> {
    return this.get<User>('profile');
  }

  /**
   * Update current user profile
   */
  updateCurrentUser(userData: UpdateUserRequest): Observable<User> {
    return this.put<User>('profile', userData);
  }

  /**
   * Search users
   */
  searchUsers(query: string): Observable<User[]> {
    const params = this.buildHttpParams({ search: query });
    return this.get<User[]>(`${this.endpoint}/search`, params);
  }

  /**
   * Activate/Deactivate user
   */
  toggleUserStatus(id: string, isActive: boolean): Observable<User> {
    return this.patch<User>(`${this.endpoint}/${id}/status`, { isActive });
  }
}
