import axios from "axios";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired(async (req) => {
  let res = NextResponse.next();
  const session = await getSession(req, res);
  const user = session?.user;

  if(!user) {
    return NextResponse.redirect(new URL('/api/auth/login', req.nextUrl.origin));
  }

  const authID = user.sub;

  try {
    const response = await axios.get(`${req.nextUrl.origin}/api/ws/users/${authID}`);
    if(response.status == 200 && req.nextUrl.pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
    }
  } catch (error) {
    if(req.nextUrl.pathname !== '/register') {
      return NextResponse.redirect(new URL('/register', req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:page*', '/profile', '/register/:page*'],
};

