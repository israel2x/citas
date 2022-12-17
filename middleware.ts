import { NextResponse } from "next/server";

const signedinPages = ["/citas"];
//const signedinPages = ["/", "/pacientes", "/settings"];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.CITAS_ACCESS_TOKEN;

    const landingUrl = new URL("/index", req.url);

    if (!token) {
      return NextResponse.redirect(landingUrl);
    }
  }
}
