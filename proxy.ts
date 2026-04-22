import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// 1. Specify public routes (all other routes are protected)
const publicRoutes = ["/sign-in", "/sign-up"];

export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((route) => path === route || path.startsWith(route + "/"));

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("os_session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to sign-in if the user is not authenticated and route is protected
  if (!isPublicRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  // 5. Redirect authenticated users away from public routes
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL(`/${session.userId}`, req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|public|.*\\..*).*)"],
};