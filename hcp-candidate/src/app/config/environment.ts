export const environment = {
  production: false,
  apiUrl: 'http://localhost:5158/api', // Update with your actual API URL
  apiVersion: 'v1',
  appName: 'HCP Candidate Portal',
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  defaultPageSize: 10,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['.pdf', '.doc', '.docx'],
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
};

export const apiEndpoints = {
  auth: {
    login: '/Auth/login',
    register: '/Auth/Registration',
    logout: '/Auth/logout',
    refresh: '/Auth/refresh',
    verify: '/Auth/verify',
    passwordReset: '/Auth/password-reset',
    changePassword: '/Auth/change-password',
  },
  users: {
    base: '/users',
    profile: '/profile',
    search: '/users/search',
  },
  jobs: {
    base: '/jobs',
    search: '/jobs/search',
    active: '/jobs/active',
    stats: '/jobs/{id}/stats',
  },
  applications: {
    base: '/applications',
    mine: '/applications/me',
    check: '/applications/check/{jobId}',
    stats: '/applications/stats',
    bulk: '/applications/bulk',
  },
  files: {
    upload: '/files/upload',
    download: '/files/{id}/download',
    delete: '/files/{id}',
  },
};
