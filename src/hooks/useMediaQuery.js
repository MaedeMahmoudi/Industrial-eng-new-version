import { useState, useEffect } from 'react'

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    const handleChange = (event) => {
      setMatches(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')
export const useIsDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
export const useIsExtraSmall = () => useMediaQuery('(max-width: 480px)')
export const useIsExtraLarge = () => useMediaQuery('(min-width: 1440px)')