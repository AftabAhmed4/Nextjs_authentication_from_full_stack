import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Delete the token cookie
  response.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });

  return response;
}
