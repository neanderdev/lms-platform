import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ["/((?!.*..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
