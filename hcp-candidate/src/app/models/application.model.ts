export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
  coverLetter?: string;
  resume?: FileAttachment;
  additionalDocuments?: FileAttachment[];
  notes?: string;
  
  // Populated fields
  job?: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
  candidate?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface CreateApplicationRequest {
  jobId: string;
  coverLetter?: string;
  resumeId?: string;
  additionalDocumentIds?: string[];
}

export interface UpdateApplicationRequest {
  status?: ApplicationStatus;
  notes?: string;
  coverLetter?: string;
}

export enum ApplicationStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEWED = 'interviewed',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  WITHDRAWN = 'withdrawn'
}

export interface FileAttachment {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
  url?: string;
}

export interface ApplicationFilters {
  jobId?: string;
  candidateId?: string;
  status?: ApplicationStatus;
  dateFrom?: Date;
  dateTo?: Date;
}
