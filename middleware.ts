import { NextResponse } from "next/server";

const signedinPages = ["/settings"];
//const signedinPages = ["/", "/citas", "/pacientes", "/settings"];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.CITAS_ACCESS_TOKEN;

    const landingUrl = new URL("/landing", req.url);

    if (!token) {
      return NextResponse.redirect(landingUrl);
    }
  }
}
