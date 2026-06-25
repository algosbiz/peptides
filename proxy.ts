import { NextResponse, type NextRequest } from "next/server";
import { decrypt } from "@/lib/auth/jwt";

// Next 16 renames middleware → proxy. Optimistic cookie check that gates the
// admin area; secure checks still happen in the DAL / server actions.
export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";

  const token = req.cookies.get("datum_session")?.value;
  const session = await decrypt(token);

  if (!session && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
  if (session && isLogin) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
