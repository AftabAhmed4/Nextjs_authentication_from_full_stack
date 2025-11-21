import { NextResponse } from "next/server";

export function proxy(req) {
  const token = req.cookies.get("token")?.value;

  if (!token && req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
