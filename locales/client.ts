"use client"
import {createI18nClient} from 'next-international/client'

export const {useChangeLocale, useCurrentLocale, useI18n, useScopedI18n, I18nProviderClient} = createI18nClient({
  "pt-BR": () => import('./pt-BR'),
  en: () => import('./en'),
  es: () => import('./es')
})