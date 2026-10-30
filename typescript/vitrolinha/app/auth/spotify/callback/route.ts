// app/auth/spotify/callback/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code  = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/?spotify=error', req.url))
  }

  // Pass code to client-side via redirect with query param
  return NextResponse.redirect(new URL(`/?spotify_code=${code}`, req.url))
}
