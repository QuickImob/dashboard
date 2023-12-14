import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
    "pt-BR": () => import('./pt-BR'),
    en: () => import('./en'),
    es: () => import('./es')
})