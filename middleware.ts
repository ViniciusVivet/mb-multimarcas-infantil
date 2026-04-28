import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function deriveSessionToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("mb-admin-session-v1"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    const session = request.cookies.get("mb_admin_session")?.value;
    const expected = await deriveSessionToken(adminPassword);

    if (session !== expected) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
