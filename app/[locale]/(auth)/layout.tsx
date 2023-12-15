import {ReactNode} from "react";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {getI18n} from "@/locales/server";
import { nextAuthOptions } from '@/utils/authOptions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ChangeLanguage from "@/app/components/changeLanguage";

export default async function Layout({children}: { children: ReactNode }) {
  const session = await getServerSession(nextAuthOptions)
  const t = await getI18n()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="login-main">
      <div className="container-language">
        <span>{t('Language')}</span>

        <ChangeLanguage/>
      </div>

      <div className="form-container">
        {children}
      </div>

    </main>
  )
}
