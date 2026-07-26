/*

import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
    const { userId, orgId } = await auth();

    const { pathname } = req.nextUrl;

    // User is signed in and visits the landing page.
    if (userId && pathname === "/") {
        const destination = orgId ? `/organization/${orgId}` : "/select-org";

        return NextResponse.redirect(new URL(destination, req.url));
    }

    // User has no active organisation.
    if (userId && !orgId && pathname !== "/select-org") {
        return NextResponse.redirect(new URL("/select-org", req.url));
    }

    // User already has an organisation but manually visits /select-org.
    if (userId && orgId && pathname === "/select-org") {
        return NextResponse.redirect(
            new URL(`/organization/${orgId}`, req.url),
        );
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and static assets
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

        // Clerk internal routes
        "/__clerk/:path*",

        // API routes
        "/(api|trpc)(.*)",
    ],
};
*/
