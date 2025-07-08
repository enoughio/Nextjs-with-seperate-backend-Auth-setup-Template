

### Route Protection Flow

```mermaid
Diagram.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-r5gt{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-r5gt .error-icon{fill:#552222;}#mermaid-diagram-r5gt .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-r5gt .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-r5gt .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-r5gt .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-r5gt .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-r5gt .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-r5gt .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-r5gt .marker{fill:#666;stroke:#666;}#mermaid-diagram-r5gt .marker.cross{stroke:#666;}#mermaid-diagram-r5gt svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-r5gt p{margin:0;}#mermaid-diagram-r5gt .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-r5gt .cluster-label text{fill:#333;}#mermaid-diagram-r5gt .cluster-label span{color:#333;}#mermaid-diagram-r5gt .cluster-label span p{background-color:transparent;}#mermaid-diagram-r5gt .label text,#mermaid-diagram-r5gt span{fill:#000000;color:#000000;}#mermaid-diagram-r5gt .node rect,#mermaid-diagram-r5gt .node circle,#mermaid-diagram-r5gt .node ellipse,#mermaid-diagram-r5gt .node polygon,#mermaid-diagram-r5gt .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-r5gt .rough-node .label text,#mermaid-diagram-r5gt .node .label text{text-anchor:middle;}#mermaid-diagram-r5gt .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-r5gt .node .label{text-align:center;}#mermaid-diagram-r5gt .node.clickable{cursor:pointer;}#mermaid-diagram-r5gt .arrowheadPath{fill:#333333;}#mermaid-diagram-r5gt .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-r5gt .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-r5gt .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-r5gt .edgeLabel p{background-color:white;}#mermaid-diagram-r5gt .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-r5gt .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-r5gt .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-r5gt .cluster text{fill:#333;}#mermaid-diagram-r5gt .cluster span{color:#333;}#mermaid-diagram-r5gt div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-r5gt .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-r5gt .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-r5gt .marker,#mermaid-diagram-r5gt marker,#mermaid-diagram-r5gt marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r5gt .label,#mermaid-diagram-r5gt text,#mermaid-diagram-r5gt text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-r5gt .background,#mermaid-diagram-r5gt rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-r5gt .entityBox,#mermaid-diagram-r5gt .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-r5gt .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-r5gt .label-container,#mermaid-diagram-r5gt rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r5gt line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r5gt :root{--mermaid-font-family:var(--font-geist-sans);}NoYesNoYesNoYesUser requests protected routeMiddleware interceptsAuth token exists?Redirect to /loginVerify with backendToken valid?Clear cookie, redirect to /loginCheck user roleRole matches route?Redirect to appropriate dashboardAllow access
```

## File Structure

```plaintext
├── app/
│   ├── layout.tsx              # Root layout with auth provider
│   ├── page.tsx                # Landing page
│   ├── login/
│   │   ├── page.tsx            # Login page (server component)
│   │   └── login-form.tsx      # Login form (client component)
│   ├── dashboard/
│   │   └── page.tsx            # User dashboard (protected)
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.tsx        # Admin dashboard (protected)
│   └── api/
│       └── auth/
│           └── verify/
│               └── route.ts    # Token verification endpoint
├── components/
│   ├── auth/
│   │   └── auth-provider.tsx   # Client auth context
│   └── layout/
│       ├── navbar-server.tsx   # Server navbar component
│       └── navbar-client.tsx   # Client navbar component
├── lib/
│   ├── auth-server.ts          # Server-side auth utilities
│   └── auth-actions.ts         # Server actions for auth
├── middleware.ts               # Route protection middleware
└── .env.example               # Environment variables template
```

### Core Files Explained

#### `lib/auth-server.ts`

Server-side authentication utilities:

- `verifyAuth()` - Validates user session
- `requireAuth()` - Enforces authentication with redirects
- `getAuthToken()` - Retrieves JWT from cookies
- `setAuthToken()` - Stores JWT securely


#### `lib/auth-actions.ts`

Next.js Server Actions:

- `loginAction()` - Handles login form submission
- `logoutAction()` - Manages logout and cleanup


#### `middleware.ts`

Edge-level protection:

- Route access control
- Token validation
- Role-based redirects


## API Integration

### Required Backend Endpoints

Your backend needs to provide these endpoints:

#### 1. Login Endpoint

```plaintext
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"user": {
"id": "1",
"email": "[user@example.com](mailto:user@example.com)",
"name": "John Doe",
"role": "user"
}
}

```plaintext

#### 2. Token Verification
```http
GET /auth/verify
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
"user": {
"id": "1",
"email": "[user@example.com](mailto:user@example.com)",
"name": "John Doe",
"role": "user"
}
}

```plaintext

#### 3. Logout Endpoint (Optional)
```http
POST /auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
"message": "Logged out successfully"
}

```plaintext

### Integration Steps

1. **Update API URLs** in your environment variables
2. **Replace mock data** in `lib/auth-server.ts` and `lib/auth-actions.ts`
3. **Adjust user interface** to match your backend's user object structure
4. **Handle API errors** appropriately for your use case

### Example Integration

\`\`\`typescript
// lib/auth-server.ts
export async function verifyAuth(): Promise<AuthResult> {
  const token = await getAuthToken()
  
  if (!token) {
    return { user: null }
  }

  try {
    // Replace with your actual backend URL
    const response = await fetch(`${process.env.BACKEND_API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return { user: null, error: "Invalid token" }
    }

    const data = await response.json()
    return { user: data.user }
  } catch (error) {
    return { user: null, error: "Authentication failed" }
  }
}
```

## ️ Security Features

### 1. HTTP-Only Cookies

- **Protection**: Prevents XSS attacks by making tokens inaccessible to JavaScript
- **Configuration**: Secure, SameSite, HttpOnly flags
- **Expiration**: Configurable token lifetime


### 2. Server-Side Validation

- **Benefit**: Authentication logic hidden from client
- **Implementation**: All auth checks on server before rendering
- **Protection**: No sensitive data exposed to browser


### 3. CSRF Protection

- **Method**: SameSite cookies and Origin header validation
- **Server Actions**: Built-in CSRF protection
- **Middleware**: Request origin verification


### 4. Role-Based Access Control

- **Granular Permissions**: Route-level and component-level access control
- **Automatic Redirects**: Users redirected to appropriate dashboards
- **Type Safety**: TypeScript ensures role consistency


### 5. Secure Cookie Configuration

```typescript
cookieStore.set("auth_token", token, {
httpOnly: true,           // Prevents XSS
secure: NODE_ENV === "production", // HTTPS only in production
sameSite: "lax",         // CSRF protection
maxAge: 60 * 60 * 24 * 7, // 7 days
path: "/",               // Available site-wide
})

```plaintext

## 🚀 Deployment

### Environment Configuration

#### Production Environment Variables
\`\`\`env
BACKEND_API_URL=https://your-api.com/api
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app.com
```

#### Security Checklist

- HTTPS enabled for secure cookies
- Backend API accessible from frontend
- CORS configured properly on backend
- Environment variables set correctly
- Cookie domain settings configured


### Deployment Platforms

#### Vercel (Recommended)

1. Connect your repository
2. Set environment variables in dashboard
3. Deploy automatically on push


#### Other Platforms

- **Netlify**: Configure build settings and environment variables
- **Railway**: Set up environment and deploy
- **Docker**: Use provided Dockerfile for containerization


### Post-Deployment Verification

1. **Test authentication flow**

1. Login with valid credentials
2. Verify role-based redirects
3. Test logout functionality



2. **Check security headers**

1. Verify HTTPS is working
2. Confirm cookies are secure
3. Test CSRF protection



3. **Monitor error logs**

1. Check for authentication failures
2. Monitor API connectivity
3. Verify middleware performance





## Customization

### Adding New User Roles

1. **Update type definitions**:
```typescript
// lib/auth-server.ts
export interface User {
id: string
email: string
name: string
role: "admin" | "user" | "moderator" // Add new role
}


```plaintext

2. **Update middleware protection**:
\`\`\`typescript
// middleware.ts
const moderatorPaths = ["/moderator"]
const isModeratorPath = moderatorPaths.some(path => pathname.startsWith(path))
```

3. **Create role-specific pages**:
```typescript
// app/moderator/dashboard/page.tsx
export default async function ModeratorDashboard() {
const user = await requireAuth("moderator")
// Moderator-specific content
}


```plaintext

### Adding New Protected Routes

1. **Create the page component**:
\`\`\`typescript
// app/settings/page.tsx
import { requireAuth } from "@/lib/auth-server"

export default async function SettingsPage() {
  const user = await requireAuth() // Any authenticated user
  return <div>Settings for {user.name}</div>
}
```

2. **Update middleware** (if needed):
```typescript
// middleware.ts
const protectedPaths = ["/dashboard", "/profile", "/settings"]


```plaintext

### Customizing the UI

The template uses **Tailwind CSS** and **shadcn/ui** components:

1. **Modify colors** in `tailwind.config.ts`
2. **Update components** in `components/ui/`
3. **Customize layouts** in `components/layout/`

### Adding Form Validation

\`\`\`typescript
// Install Zod for validation
npm install zod

// lib/validations.ts
import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Use in server actions
export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return { error: "Invalid form data" }
  }

  // Continue with authentication...
}
```

## Troubleshooting

### Common Issues

#### Authentication Not Working

**Symptoms**: Users can't log in or stay logged in
**Causes**:

- Backend API not accessible
- Incorrect environment variables
- Cookie configuration issues


**Solutions**:

1. Check `BACKEND_API_URL` in environment variables
2. Verify backend API is running and accessible
3. Check browser developer tools for cookie issues
4. Ensure HTTPS in production for secure cookies


#### Infinite Redirect Loops

**Symptoms**: Page keeps redirecting endlessly
**Causes**:

- Middleware and page-level auth conflicts
- Incorrect role-based redirect logic


**Solutions**:

1. Check middleware redirect logic
2. Verify `requireAuth()` usage in pages
3. Ensure role checks are consistent


#### "useAuth must be used within an AuthProvider"

**Symptoms**: Error when using `useAuth()` hook
**Causes**:

- Client component not wrapped in AuthProvider
- Server component trying to use client hook


**Solutions**:

1. Use server-side `verifyAuth()` in server components
2. Ensure client components are within AuthProvider
3. Check component boundaries (client vs server)


#### Cookies Not Being Set

**Symptoms**: Authentication doesn't persist across requests
**Causes**:

- HTTPS requirement in production
- Incorrect cookie configuration
- Domain mismatch


**Solutions**:

1. Enable HTTPS in production
2. Check cookie domain settings
3. Verify `secure` flag configuration


### Debug Mode

Enable debug logging:

```typescript
// lib/auth-server.ts
const DEBUG = process.env.NODE_ENV === 'development'

export async function verifyAuth(): Promise`<AuthResult>` {
if (DEBUG) console.log('Verifying auth...')

const token = await getAuthToken()
if (DEBUG) console.log('Token:', token ? 'exists' : 'missing')

// ... rest of function
}

```plaintext

### Performance Issues

#### Slow Authentication Checks

**Solutions**:
1. Implement token caching
2. Optimize backend API response times
3. Use middleware for early route protection

#### Memory Leaks

**Solutions**:
1. Properly cleanup event listeners
2. Avoid storing large objects in context
3. Use React DevTools Profiler

## 📚 Additional Resources

### Next.js Documentation
- [App Router](https://nextjs.org/docs/app)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

### Security Best Practices
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

### UI Components
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

This template is designed to be customized for your specific needs. Common improvements:

1. **Enhanced Security**: Add 2FA, rate limiting, session management
2. **Better UX**: Loading states, error boundaries, offline support
3. **Monitoring**: Error tracking, analytics, performance monitoring
4. **Testing**: Unit tests, integration tests, E2E tests

## 📄 License

This template is provided as-is for educational and commercial use. Customize as needed for your projects.

---

**Need Help?** 
- Check the troubleshooting section above
- Review the implementation guide in the codebase
- Ensure your backend API matches the expected interface

**Security Note**: This template includes demo credentials and mock authentication for testing. Remove all mock data before production deployment.
```

`</CodeProject>`This comprehensive documentation covers everything needed to understand, implement, and customize the Next.js BFF template. It includes:

## Documentation Sections

**🚀 Quick Start** - Get up and running in minutes
**🏗️ Architecture** - Understand the server-side approach
**🔐 Authentication Flow** - Visual diagrams of the auth process
**📁 File Structure** - Detailed explanation of each component
**🔌 API Integration** - How to connect your backend
**🛡️ Security Features** - Comprehensive security measures
**🚀 Deployment** - Production deployment guide
**🎨 Customization** - How to extend and modify the template
**🐛 Troubleshooting** - Common issues and solutions

The documentation is structured to help both beginners and experienced developers understand and implement the authentication system effectively. It includes practical examples, security considerations, and real-world deployment scenarios.

`<Actions>
  <Action name="Create API documentation" description="Generate OpenAPI/Swagger docs for backend integration" />
  <Action name="Add testing guide" description="Create comprehensive testing documentation with examples" />
  <Action name="Setup monitoring guide" description="Document error tracking and performance monitoring setup" />
  <Action name="Create migration guide" description="Guide for migrating from client-side to server-side auth" />
  <Action name="Add security audit checklist" description="Comprehensive security review checklist for production" />
</Actions>`
