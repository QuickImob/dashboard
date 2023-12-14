// middleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import {NextRequest, NextResponse} from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['pt-BR', 'en', 'es'],
  defaultLocale: 'pt-BR'
})

export function middleware(request: NextRequest): NextResponse {
  return I18nMiddleware(request)
}

export const config: {matcher: string[]} = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}