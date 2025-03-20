// lib/auth-client.ts
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})

// Optionally export specific methods
export const { signIn, signUp, useSession } = authClient;