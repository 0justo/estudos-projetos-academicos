// app/auth/spotify/route.ts
// This route is not used server-side; login is initiated client-side via PKCE
// Kept as placeholder for middleware compatibility
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.redirect('/')
}
