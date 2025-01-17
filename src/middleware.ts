import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTE } from "./lib/constatns";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const url = req.url;
  const isPrivateUrl =
    url.includes(ROUTE.LOGIN) || url.includes(ROUTE.REGISTRATION);

  if (accessToken && isPrivateUrl) {
    return NextResponse.redirect(new URL(ROUTE.MAIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/registration"],
};
