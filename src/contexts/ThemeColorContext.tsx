import { createContext, ReactNode, useEffect, useState } from 'react'

type Theme = 'light' | 'dark';

type ThemeColorContextProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeColorContext = createContext({} as ThemeContextType);

export function ThemeColorContextProvider(props: ThemeColorContextProviderProps) {
   
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('theme')

    return (storagedTheme ?? 'light') as Theme;
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme])

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return (
     <div className={currentTheme === 'light' ? 'light-theme' : 'dark-theme'}>
      <ThemeColorContext.Provider value={{ theme: currentTheme, toggleTheme }}>
         {props.children}
      </ThemeColorContext.Provider>
    </div>
  )
}