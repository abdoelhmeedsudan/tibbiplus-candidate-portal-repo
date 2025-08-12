export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  salaryRange: SalaryRange;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  isActive: boolean;
  applicationDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
  postedBy: string;
  applicationsCount?: number;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  salaryRange: SalaryRange;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  applicationDeadline: Date;
}

export interface UpdateJobRequest {
  title?: string;
  description?: string;
  department?: string;
  location?: string;
  employmentType?: EmploymentType;
  salaryRange?: SalaryRange;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  applicationDeadline?: Date;
  isActive?: boolean;
}

export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  REMOTE = 'remote',
  HYBRID = 'hybrid'
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'hourly' | 'monthly' | 'yearly';
}

export interface JobFilters {
  department?: string;
  location?: string;
  employmentType?: EmploymentType;
  salaryMin?: number;
  salaryMax?: number;
  isActive?: boolean;
}
