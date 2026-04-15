import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isCoachRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/sessions(.*)",
  "/profile(.*)",
  "/earnings(.*)",
  "/onboarding(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/s/(.*)",
  "/book/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/explore(.*)",
  "/coaches/(.*)",
  "/my-booking(.*)",
  "/api/webhooks/(.*)",
  "/api/cron/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return NextResponse.next();

  if (isCoachRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
