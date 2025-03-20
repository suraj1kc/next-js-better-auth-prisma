import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
    // Use getSessionCookie to check for the existence of a valid session cookie
    const sessionCookie = getSessionCookie(request, {
        cookieName: "session_token", // Make sure this matches your auth config
        cookiePrefix: "better-auth", // Make sure this matches your auth config
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