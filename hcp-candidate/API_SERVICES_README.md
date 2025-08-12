# API Services and Models

This directory contains the generated API services and models for the HCP Candidate Portal.

## Structure

```
src/app/
├── services/           # API service classes
│   ├── base-api.service.ts      # Base service with common HTTP methods
│   ├── auth.service.ts          # Authentication service
│   ├── user.service.ts          # User management service
│   ├── job.service.ts           # Job listing service
│   ├── application.service.ts   # Job application service
│   └── index.ts                 # Service exports
├── models/             # TypeScript interfaces and types
│   ├── user.model.ts            # User-related interfaces
│   ├── job.model.ts             # Job-related interfaces
│   ├── application.model.ts     # Application-related interfaces
│   ├── common.model.ts          # Common interfaces (pagination, etc.)
│   └── index.ts                 # Model exports
├── interceptors/       # HTTP interceptors
│   ├── auth.interceptor.ts      # Automatic token attachment
│   ├── error.interceptor.ts     # Error handling and token refresh
│   └── index.ts                 # Interceptor exports
└── config/
    └── environment.ts           # API configuration
```

## Configuration

1. **Update API Base URL**: Edit `src/app/services/base-api.service.ts` and update the `baseUrl` property:
   ```typescript
   protected readonly baseUrl = 'https://your-api-domain.com/api';
   ```

2. **Configure Environment**: Update `src/app/config/environment.ts` with your API settings.

## Usage Examples

### Authentication Service

```typescript
import { AuthService } from './services/auth.service';

// Login
this.authService.login({ email: 'user@example.com', password: 'password' })
  .subscribe(response => {
    console.log('Login successful:', response.user);
    // User is automatically stored and token is set
  });

// Register
this.authService.register({
  email: 'new@example.com',
  password: 'password',
  confirmPassword: 'password',
  firstName: 'John',
  lastName: 'Doe',
  agreeToTerms: true
}).subscribe(response => {
  console.log('Registration successful:', response);
});

// Check if authenticated
const isLoggedIn = this.authService.isAuthenticated();

// Get current user
const currentUser = this.authService.getCurrentUser();

// Logout
this.authService.logout();
```

### Job Service

```typescript
import { JobService } from './services/job.service';

// Get active jobs with pagination
this.jobService.getActiveJobs({ page: 1, limit: 10 })
  .subscribe(response => {
    console.log('Jobs:', response.data);
    console.log('Total:', response.pagination.totalItems);
  });

// Search jobs
this.jobService.searchJobs('developer', { department: 'IT', location: 'Remote' })
  .subscribe(jobs => {
    console.log('Search results:', jobs);
  });

// Get job by ID
this.jobService.getJobById('job-id')
  .subscribe(job => {
    console.log('Job details:', job);
  });
```

### Application Service

```typescript
import { ApplicationService } from './services/application.service';

// Apply for a job
this.applicationService.createApplication({
  jobId: 'job-id',
  coverLetter: 'I am interested in this position...',
  resumeId: 'resume-file-id'
}).subscribe(application => {
  console.log('Application submitted:', application);
});

// Get my applications
this.applicationService.getMyApplications({ page: 1, limit: 5 })
  .subscribe(response => {
    console.log('My applications:', response.data);
  });

// Check if already applied
this.applicationService.checkApplicationExists('job-id')
  .subscribe(result => {
    if (result.exists) {
      console.log('Already applied with ID:', result.applicationId);
    }
  });
```

### User Service

```typescript
import { UserService } from './services/user.service';

// Get current user profile
this.userService.getCurrentUser()
  .subscribe(user => {
    console.log('Profile:', user);
  });

// Update profile
this.userService.updateCurrentUser({
  firstName: 'Updated Name',
  phone: '+1234567890'
}).subscribe(updatedUser => {
  console.log('Profile updated:', updatedUser);
});
```

## Component Integration

The registration component has been updated as an example showing how to integrate these services:

```typescript
// In your component
constructor(
  private authService: AuthService,
  private jobService: JobService,
  private applicationService: ApplicationService
) {}

// Use the services in your component methods
onSubmit() {
  this.authService.register(this.formData)
    .subscribe({
      next: (response) => {
        // Handle success
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Handle error
        this.errorMessage = error.message;
      }
    });
}
```

## Error Handling

The services include automatic error handling through interceptors:

- **Auth Interceptor**: Automatically attaches JWT tokens to requests
- **Error Interceptor**: Handles 401/403 errors, automatic token refresh, and logout on auth failure

## HTTP Client Configuration

Make sure your `app.config.ts` includes the HTTP client provider:

```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideHttpClient()
  ]
};
```

## Customization

To customize for your specific API:

1. **Update Models**: Modify the interfaces in the `models/` directory to match your API response structure
2. **Update Services**: Add or modify methods in the service classes
3. **Update Base Service**: Modify the `BaseApiService` if your API has different response format
4. **Add New Services**: Create new service files following the same pattern

## API Response Format

The services expect your API to return responses in this format:

```typescript
// Success Response
{
  "data": { /* your actual data */ },
  "success": true,
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "message": "Error message",
  "error": "detailed error information"
}

// Paginated Response
{
  "data": [/* array of items */],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "totalItems": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

If your API uses a different format, update the `BaseApiService` accordingly.

## Next Steps

1. Update the API base URL in `BaseApiService`
2. Customize the models to match your API schema
3. Add any additional services you need
4. Configure the interceptors for your authentication flow
5. Test the services with your actual API endpoints

## Support

If you need additional services or modifications, please provide:
- API documentation or OpenAPI/Swagger specification
- Sample API responses
- Specific endpoints you need services for
