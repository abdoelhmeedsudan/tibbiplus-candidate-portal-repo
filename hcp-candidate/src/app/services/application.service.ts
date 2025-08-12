import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { 
  Application, 
  CreateApplicationRequest, 
  UpdateApplicationRequest, 
  ApplicationFilters,
  PaginatedResponse, 
  PaginationRequest 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseApiService {

  private readonly endpoint = 'applications';

  /**
   * Get all applications with pagination and filters
   */
  getApplications(params?: PaginationRequest & ApplicationFilters): Observable<PaginatedResponse<Application>> {
    const httpParams = params ? this.buildHttpParams(params) : undefined;
    return this.get<PaginatedResponse<Application>>(this.endpoint, httpParams);
  }

  /**
   * Get application by ID
   */
  getApplicationById(id: string): Observable<Application> {
    return this.get<Application>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new application (candidate applies to job)
   */
  createApplication(applicationData: CreateApplicationRequest): Observable<Application> {
    return this.post<Application>(this.endpoint, applicationData);
  }

  /**
   * Update application (status, notes, etc.)
   */
  updateApplication(id: string, applicationData: UpdateApplicationRequest): Observable<Application> {
    return this.put<Application>(`${this.endpoint}/${id}`, applicationData);
  }

  /**
   * Delete/Withdraw application
   */
  deleteApplication(id: string): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Get applications for current candidate
   */
  getMyApplications(params?: PaginationRequest): Observable<PaginatedResponse<Application>> {
    const httpParams = params ? this.buildHttpParams(params) : undefined;
    return this.get<PaginatedResponse<Application>>(`${this.endpoint}/me`, httpParams);
  }

  /**
   * Get applications for a specific job (recruiter/admin)
   */
  getApplicationsByJob(jobId: string, params?: PaginationRequest): Observable<PaginatedResponse<Application>> {
    const queryParams = { ...params, jobId };
    const httpParams = this.buildHttpParams(queryParams);
    return this.get<PaginatedResponse<Application>>(this.endpoint, httpParams);
  }

  /**
   * Get applications by candidate (admin only)
   */
  getApplicationsByCandidate(candidateId: string, params?: PaginationRequest): Observable<PaginatedResponse<Application>> {
    const queryParams = { ...params, candidateId };
    const httpParams = this.buildHttpParams(queryParams);
    return this.get<PaginatedResponse<Application>>(this.endpoint, httpParams);
  }

  /**
   * Update application status (recruiter/admin)
   */
  updateApplicationStatus(id: string, status: string, notes?: string): Observable<Application> {
    return this.patch<Application>(`${this.endpoint}/${id}/status`, { status, notes });
  }

  /**
   * Withdraw application (candidate)
   */
  withdrawApplication(id: string): Observable<Application> {
    return this.patch<Application>(`${this.endpoint}/${id}/withdraw`, {});
  }

  /**
   * Check if candidate has already applied to job
   */
  checkApplicationExists(jobId: string): Observable<{ exists: boolean; applicationId?: string }> {
    return this.get<{ exists: boolean; applicationId?: string }>(`${this.endpoint}/check/${jobId}`);
  }

  /**
   * Get application statistics (admin/recruiter)
   */
  getApplicationStats(filters?: ApplicationFilters): Observable<any> {
    const httpParams = filters ? this.buildHttpParams(filters) : undefined;
    return this.get<any>(`${this.endpoint}/stats`, httpParams);
  }

  /**
   * Bulk update applications (admin/recruiter)
   */
  bulkUpdateApplications(applicationIds: string[], updates: UpdateApplicationRequest): Observable<Application[]> {
    return this.put<Application[]>(`${this.endpoint}/bulk`, { ids: applicationIds, updates });
  }
}
