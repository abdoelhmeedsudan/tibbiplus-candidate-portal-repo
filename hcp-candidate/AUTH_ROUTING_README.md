# Authentication Routing Configuration

## 🚀 **Routing Structure**

The application now has two main layout structures:

### **Auth Layout Routes** (`/auth`)
- **`/auth/login`** - Login page
- **`/auth/register`** - Registration page (your existing registration component)
- **`/auth`** - Redirects to `/auth/login`

### **Main Layout Routes** (`/`)
- **`/`** - Home page
- **`/dashboard`** - Dashboard (protected by AuthGuard)

### **Route Redirects**
- **`/login`** → `/auth/login`
- **`/register`** → `/auth/register`

## 🛡️ **Route Guards**

### **AuthGuard** (`src/app/guards/auth.guard.ts`)
- Protects authenticated routes
- Redirects unauthenticated users to `/auth/login`
- Used on: `/dashboard` and other protected routes

### **GuestGuard** (`src/app/guards/guest.guard.ts`)
- Protects authentication routes from authenticated users
- Redirects authenticated users to `/dashboard`
- Used on: `/auth` routes

## 📁 **File Structure**

```
src/app/
├── guards/
│   ├── auth.guard.ts          # Protects authenticated routes
│   ├── guest.guard.ts         # Protects guest-only routes
│   └── index.ts               # Guard exports
├── layouts/
│   ├── auth-layout/           # Layout for login/register
│   │   ├── auth-layout.ts
│   │   ├── auth-layout.html
│   │   └── auth-layout.css
│   └── main-layout/           # Main app layout
├── pages/
│   ├── login/                 # New login component
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   ├── login.component.scss
│   │   └── login.component.spec.ts
│   └── registration/          # Your existing registration
└── app.routes.ts              # Updated routing configuration
```

## 🎯 **How It Works**

1. **Unauthenticated User Flow:**
   - User visits `/` → Sees home page
   - User visits `/dashboard` → Redirected to `/auth/login` (AuthGuard)
   - User visits `/login` → Redirected to `/auth/login`
   - User visits `/auth/login` → Shows login form in AuthLayout
   - User visits `/auth/register` → Shows your existing registration form in AuthLayout

2. **Authenticated User Flow:**
   - User visits `/auth/login` → Redirected to `/dashboard` (GuestGuard)
   - User visits `/dashboard` → Shows dashboard in MainLayout
   - User can access all protected routes

## 🚀 **Navigation Examples**

### In Your Components:
```typescript
// Navigate to login
this.router.navigate(['/auth/login']);

// Navigate to registration
this.router.navigate(['/auth/register']);

// Navigate to dashboard after login
this.router.navigate(['/dashboard']);

// Navigate to home
this.router.navigate(['/']);
```

### In Templates:
```html
<!-- Login link -->
<a routerLink="/auth/login">Sign In</a>

<!-- Registration link -->
<a routerLink="/auth/register">Sign Up</a>

<!-- Dashboard link (protected) -->
<a routerLink="/dashboard">Dashboard</a>
```

## ✅ **Key Benefits**

1. **Clean URLs**: `/auth/login`, `/auth/register` instead of just `/login`
2. **Layout Separation**: Different layouts for auth vs main app
3. **Route Protection**: Guards prevent unauthorized access
4. **Existing Code Preserved**: Your registration component is unchanged
5. **Consistent Navigation**: All auth routes use the same layout

## 🔧 **Usage**

The routing is now fully configured. Your existing registration component will work exactly as before, but now it will:

- Be accessible at `/auth/register` and `/register` (redirects)
- Use the AuthLayout for consistent styling with login
- Be protected by GuestGuard (authenticated users redirected to dashboard)
- Have navigation links to login page

No changes needed to your existing registration component code!

## 📝 **Next Steps**

1. Test the routing by navigating to:
   - `/auth/login` - Should show the login form
   - `/auth/register` - Should show your existing registration form
   - `/dashboard` - Should redirect to login if not authenticated

2. Update navigation components to use the new routes

3. Customize the AuthLayout styling if needed

The authentication routing is now complete and ready to use! 🎉
