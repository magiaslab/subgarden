import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  // Canonicalizza URL malformed tipo /it/en/privacy -> /en/privacy
  const doubleLocaleMatch = pathname.match(/^\/(it|en|de)\/(it|en|de)(\/.*)?$/);
  if (doubleLocaleMatch) {
    const targetLocale = doubleLocaleMatch[2];
    const rest = doubleLocaleMatch[3] || '';
    const url = nextUrl.clone();
    url.pathname = `/${targetLocale}${rest}`;
    return NextResponse.redirect(url, 308);
  }

  // Forza host canonico www per ridurre duplicati host-level in Search Console
  if (nextUrl.hostname === 'subgarden.it') {
    const url = nextUrl.clone();
    url.hostname = 'www.subgarden.it';
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
