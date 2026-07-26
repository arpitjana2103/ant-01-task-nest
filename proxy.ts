import { clerkMiddleware } from "@clerk/nextjs/server";
import type { ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/************************************************************************************

 Public Routes
             1. /
             2. /sign-in
             3. /sign-up

 Protected Routes
             1. /select-org
             2. /organization/id


 User visits
     │
     │
 Public Route?
     │
     ├── Yes
     │      │
     │      ├── Logged Out ─────────────────────────> Continue
     │      │
     │      └── Logged In
     │             │
     │             ├── Has Organisation ───────────> /organization/:id
     │             │
     │             └── No Organisation ────────────> /select-org
     │
     └── No
            │
            ├── Logged Out ────────────────────────> Sign In
            │
            └── Logged In
                   │
                   ├── Has Organisation ───────────> Continue
                   │
                   └── No Organisation ────────────> /select-org

************************************************************************************/

const isPublicRoute = function (pathname: string) {
    return (
        pathname === "/" ||
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/sign-up")
    );
};

export default clerkMiddleware(async function (
    auth: ClerkMiddlewareAuth,
    req: NextRequest,
) {
    const { userId, orgId } = await auth();
    const { pathname } = req.nextUrl;

    const hasOrg = Boolean(orgId);
    const isLoggedIn = Boolean(userId);
    const visitingPublicRoute = isPublicRoute(pathname);

    console.log(isLoggedIn, hasOrg);

    if (isLoggedIn && !hasOrg && pathname !== "/select-org") {
        return NextResponse.redirect(new URL("/select-org", req.url));
    }

    if (isLoggedIn && hasOrg && pathname === "/select-org") {
        return NextResponse.redirect(
            new URL(`/organization/${orgId}`, req.url),
        );
    }

    if (isLoggedIn && visitingPublicRoute) {
        const destination = hasOrg ? `/organization/${orgId}` : "/select-org";
        return NextResponse.redirect(new URL(destination, req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for Clerk's auto-proxy path
        "/__clerk/:path*",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
