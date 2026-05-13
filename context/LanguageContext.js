import { createContext, useContext, useState } from 'react'
import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'
import { translations } from '../data/translations'

const LanguageContext = createContext()

const i18n = new I18n(translations)
i18n.enableFallback = true
i18n.defaultLocale = 'fr'

export function LanguageProvider({ children }) {
  const deviceLang = getLocales()[0].languageCode
  const [language, setLanguage] = useState('auto')

  const currentLang = language === 'auto' ? deviceLang : language
  i18n.locale = currentLang

  const t = (key) => i18n.t(key)

  const formatPrice = (price) => {
    const locale = currentLang === 'fr' ? 'fr-CA' : 'en-CA'
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'CAD'
    }).format(price)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}