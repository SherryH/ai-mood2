import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// This config is always run first before reaching clerkMiddleware function
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, request) => {
  console.log({ request })
  if (!isPublicRoute(request)) {
    console.log({ request })
    auth().protect()
  }
})