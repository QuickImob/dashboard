import '@/app/globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ReactNode} from "react";
import {I18nProviderClient} from '@/locales/client';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'QuickImob',
  description: 'QuickImob',
}

export default function RootLayout({params: {locale}, children}: { params: { locale: string }, children: ReactNode }) {
  
  return (
    <html lang={locale}>
    <body className={inter.className}>
        <I18nProviderClient locale={locale}>
          {children}
        </I18nProviderClient>
    </body>
    </html>
  )
}
