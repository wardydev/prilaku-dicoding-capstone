import { NextResponse } from "next/server";

export function middleware(request) {
  const USER_TOKEN = request.cookies.get("USER_TOKEN");

  if (USER_TOKEN) {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } else {
    if (
      request.nextUrl.pathname.startsWith("/home") ||
      request.nextUrl.pathname.startsWith("/history")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
