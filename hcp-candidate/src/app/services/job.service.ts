import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { 
  Job, 
  CreateJobRequest, 
  UpdateJobRequest, 
  JobFilters,
  PaginatedResponse, 
  PaginationRequest 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class JobService extends BaseApiService {

  private readonly endpoint = 'jobs';

  /**
   * Get all jobs with pagination and filters
   */
  getJobs(params?: PaginationRequest & JobFilters): Observable<PaginatedResponse<Job>> {
    const httpParams = params ? this.buildHttpParams(params) : undefined;
    return this.get<PaginatedResponse<Job>>(this.endpoint, httpParams);
  }

  /**
   * Get active jobs only
   */
  getActiveJobs(params?: PaginationRequest & JobFilters): Observable<PaginatedResponse<Job>> {
    const queryParams = { ...params, isActive: true };
    const httpParams = this.buildHttpParams(queryParams);
    return this.get<PaginatedResponse<Job>>(this.endpoint, httpParams);
  }

  /**
   * Get job by ID
   */
  getJobById(id: string): Observable<Job> {
    return this.get<Job>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new job (admin/recruiter only)
   */
  createJob(jobData: CreateJobRequest): Observable<Job> {
    return this.post<Job>(this.endpoint, jobData);
  }

  /**
   * Update job (admin/recruiter only)
   */
  updateJob(id: string, jobData: UpdateJobRequest): Observable<Job> {
    return this.put<Job>(`${this.endpoint}/${id}`, jobData);
  }

  /**
   * Delete job (admin/recruiter only)
   */
  deleteJob(id: string): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Search jobs by title, description, or department
   */
  searchJobs(query: string, filters?: JobFilters): Observable<Job[]> {
    const params = this.buildHttpParams({ search: query, ...filters });
    return this.get<Job[]>(`${this.endpoint}/search`, params);
  }

  /**
   * Get jobs by department
   */
  getJobsByDepartment(department: string): Observable<Job[]> {
    const params = this.buildHttpParams({ department });
    return this.get<Job[]>(this.endpoint, params);
  }

  /**
   * Get jobs by location
   */
  getJobsByLocation(location: string): Observable<Job[]> {
    const params = this.buildHttpParams({ location });
    return this.get<Job[]>(this.endpoint, params);
  }

  /**
   * Toggle job active status
   */
  toggleJobStatus(id: string, isActive: boolean): Observable<Job> {
    return this.patch<Job>(`${this.endpoint}/${id}/status`, { isActive });
  }

  /**
   * Get job statistics (admin/recruiter only)
   */
  getJobStats(id: string): Observable<any> {
    return this.get<any>(`${this.endpoint}/${id}/stats`);
  }
}
