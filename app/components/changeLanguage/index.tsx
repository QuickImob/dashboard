'use client'

import {useChangeLocale, useCurrentLocale} from '@/locales/client'
import {ReactNode} from "react";

export default function ChangeLanguage(): ReactNode {
  const changeLocale = useChangeLocale()
  const locale: "pt-BR" | "en" | "es" = useCurrentLocale()

  return (
    <select className="block w-full p-2 text-sm text-gray-900 cursor-pointer border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-impacte-blue focus:outline-impacte-blue"
      value={locale}
      // @ts-ignore
      onChange={(e) => changeLocale(e.target.value)}
    >
      <option value="pt-BR">pt-BR</option>
      <option value="en">en</option>
      <option value="es">es</option>
    </select>
  )
}