import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';

export default async function middleware(req: NextRequest, res: NextResponse) {
    const user = useUser();
    if (user.user) {
        const response = await axios.get(`/api/ws/users/auth/${user.user?.sub}`);
        const data = await response.data.json();

        if (data.exists) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
    } else {
        console.log("No user");
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
}