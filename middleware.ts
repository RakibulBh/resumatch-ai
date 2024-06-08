import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/'
])



export default clerkMiddleware((auth, req) => {
  // Restrict admin routes to users with specific permissions
  if (!isPublicRoute(req)) {
    auth().protect()
  }

});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};