import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request) {
  // request.geo.country is undefined in dev mode, 'TW' as backup
  const country = request.geo.country || 'TW';
  const cookieLang = request.cookies.get('NEXT_LOCALE')?.value || 'zhHant';
  const currentLang = request.nextUrl.locale;

  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  } else {
    return
    console.log(request.nextUrl); //FIXME:
    console.log('currentLang:', currentLang); //FIXME:
    console.log('country:', country); //FIXME:
    console.log('cookieLang:', cookieLang);
  }

  switch (cookieLang) {
    case 'zhHant':
      if (currentLang === 'zhHant') {
        return;
      } else {
        const url = request.nextUrl.clone();
        url.href = `${url.origin}${url.pathname}`;
        console.log(url); //FIXME:
        return NextResponse.redirect(url);
      }

    default:
    case 'en':
      if (currentLang === 'en') {
        return;
      } else {
        const url = request.nextUrl.clone();
        url.pathname = `/en${url.pathname}`;
        console.log(url); //FIXME:
        return NextResponse.redirect(url);
      }
  }
}
