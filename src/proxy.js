
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "../lib/db";


export async function proxy(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await db.query(
      "SELECT active_token FROM users WHERE id=?",
      [decoded.id]
    );


    // Check if user is admin
    if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }


    // Token match nahi → user forced logout
    if (rows.length === 0 || rows[0].active_token !== token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  // matcher: ["/dashboard", "/","/admin"],
  matcher: ["/","/admin"],
};
