import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function deriveSessionToken(password: string) {
  return createHmac("sha256", password).update("mb-admin-session-v1").digest("hex");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    const session = request.cookies.get("mb_admin_session")?.value;
    if (session !== deriveSessionToken(adminPassword)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
