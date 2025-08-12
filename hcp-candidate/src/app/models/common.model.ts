export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  timestamp: string;
  path: string;
  details?: any;
}

export interface PaginationRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponseBase {
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface SuccessResponse<T> extends ApiResponseBase {
  data: T;
}

export interface ErrorResponse extends ApiResponseBase {
  error: ApiError;
}

export interface FilterOptions {
  [key: string]: any;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface SearchOptions {
  query: string;
  fields?: string[];
}
