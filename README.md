# Next.js Better Auth with Prisma ORM Template

A modern authentication template for Next.js 15+ applications using the [better-auth](https://better-auth.dev/) library. This template demonstrates a clean, type-safe implementation of email/password authentication with protected routes and session management.

## Features

- ✅ Email and password authentication
- ✅ Protected routes with middleware
- ✅ PostgreSQL database integration with Prisma
- ✅ Server actions for authentication
- ✅ Type-safe authentication API
- ✅ Modern UI with Tailwind CSS and Geist font
- ✅ Cookie-based session management

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL database (local or hosted)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/next-js-better-auth.git
   cd next-js-better-auth
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Configure environment variables by creating a `.env` file in the root directory:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/better_auth_db"
   ```

4. Initialize the database with Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

- `app/` - Next.js app router components and routes
- `lib/` - Authentication configuration and client utilities
- `server/` - Server-side actions for authentication
- `prisma/` - Database schema and migrations
- `middleware.ts` - Route protection middleware

## Key Files

- `lib/auth.ts` - Main authentication configuration using better-auth
- `lib/auth-client.ts` - Client-side authentication utilities
- `server/user.ts` - Server actions for sign-in and sign-up
- `middleware.ts` - Route protection middleware
- `app/api/auth/[...all]/route.ts` - API route handler for authentication endpoints

## Authentication Flow

### Sign Up
The template provides a simple sign-up flow with email, password, and name:

```typescript
// From server/user.ts
export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "user@example.com",
            password: "securepassword",
            name: "User Name",
        },
    });
}
```

### Sign In
Users can sign in with their email and password:

```typescript
// From server/user.ts
export const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "user@example.com",
            password: "securepassword",
        },
    });
}
```

### Protected Routes
Routes are protected using Next.js middleware:

```typescript
// From middleware.ts
export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request, {
        cookieName: "session_token",
        cookiePrefix: "better-auth",
        useSecureCookies: process.env.NODE_ENV === "production"
    });

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"],
};
```

## Customization

### Adding New Protected Routes
To add more protected routes, simply update the `matcher` array in `middleware.ts`:

```typescript
export const config = {
    matcher: ["/dashboard", "/profile", "/settings"],
};
```

### Changing Auth Configuration
Modify the auth configuration in `lib/auth.ts` to add more authentication providers or change settings:

```typescript
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true, 
    // Add more configuration here
  },
  // Add OAuth providers here
  plugins: [nextCookies()],
});
```

## Deployment

This template can be deployed to any platform that supports Next.js, such as Vercel or Netlify. Make sure to set up the environment variables for your database connection.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [better-auth](https://better-auth.dev/) - Type-safe authentication library for JavaScript
- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript

---

Made with ❤️ by [Suraj Katwal]