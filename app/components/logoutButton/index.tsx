'use client'

import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import { useI18n } from "@/locales/client";

export default function Logout(){
  const t = useI18n()
  const router =  useRouter()

  const logout = async () => {
    await signOut({
      redirect: false
    })

    router.replace('/login', { scroll: false })
  }

  return <button onClick={logout}>{t('Logout')}</button>
}