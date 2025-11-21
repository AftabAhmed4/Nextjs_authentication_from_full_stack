// /api/admin/logout-user/route.js


// import { NextResponse } from "next/server";
// import db from "../../../../../lib/db";

// export async function POST(req) {
//   const { user_id } = await req.json();

//   // Token remove → user logout
//   await db.query("UPDATE users SET active_token=NULL WHERE id=?", [user_id]);

//   return NextResponse.json({ message: "User Logged Out By Admin" });
// }
// import { NextResponse } from "next/server";
// import db from "../../../../../lib/db"; // Ensure path correct

// export async function POST(req) {
//   const { user_id, isBlock } = await req.json();

//   // Force logout + block user
//   await db.query(
//     "UPDATE users SET active_token=NULL, blocked=? WHERE id=?",
//     [user_id, isBlock]
//   );

//   return NextResponse.json({ message: "User blocked and logged out!" });
// }

import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function POST(req) {
  const { user_id, isBlock } = await req.json();

  // Update active_token + blocked field
  await db.query(
    "UPDATE users SET active_token = ?, blocked = ? WHERE id = ?",
    [isBlock ? null : undefined, isBlock ? 1 : 0, user_id]
  );

  return NextResponse.json({
    message: isBlock
      ? "User blocked and logged out!"
      : "User unblocked successfully!"
  });
}
