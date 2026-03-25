import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const CANONICAL_HOST = new URL(
  process.env.NEXT_PUBLIC_BASE_URL || 'https://leocode.com.ua'
).host
const REDIRECT_HOSTS = new Set([`www.${CANONICAL_HOST}`])
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])
const PREVIEW_HOST_SUFFIXES = ['.vercel.app', '.vercel.sh']

export function proxy(request: NextRequest) {
  const hostHeader =
    request.headers.get('x-forwarded-host') ??
    request.headers.get('host') ??
    request.nextUrl.host
  const hostname = hostHeader.toLowerCase().split(':')[0]

  if (REDIRECT_HOSTS.has(hostname)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.protocol = 'https:'
    redirectUrl.hostname = CANONICAL_HOST
    redirectUrl.port = ''
    return NextResponse.redirect(redirectUrl, 301)
  }

  const response = NextResponse.next()

  if (
    hostname !== CANONICAL_HOST &&
    !LOCAL_HOSTS.has(hostname) &&
    !hostname.endsWith('.localhost') &&
    PREVIEW_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix))
  ) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  }

  return response
}

export const config = {
  matcher: '/:path*',
}
