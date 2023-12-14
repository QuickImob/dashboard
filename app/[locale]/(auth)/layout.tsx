import {ReactNode} from "react";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {getI18n} from "@/locales/server";
import { nextAuthOptions } from '@/utils/authOptions';

export default async function Layout({children}: { children: ReactNode }) {
  const session = await getServerSession(nextAuthOptions)
  const t = await getI18n()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="guest-main">
      <div className="container-language">
        <span>{t('Number')}</span>
      </div>

      <div className="form-container">
        {children}
      </div>

    </main>
  )
}
