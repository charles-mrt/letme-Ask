import { BrowserRouter, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeColorContext } from './contexts/ThemeColorContext';

function App() {

  let [colorTheme, setColorTheme] = useState('theme-color');

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('theme-color');
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, [])

  const changeThemeColor = () => {

    if (colorTheme === "light") {
      setColorTheme(colorTheme = "dark");
      localStorage.setItem('theme-color', 'dark')
    }
    else {
      setColorTheme(colorTheme = "light");
      localStorage.setItem('theme-color', 'light')
    }

  }

  return (
    <BrowserRouter>
      <ThemeColorContext.Provider value={{ changeThemeColor, colorTheme }}>
        <div className={colorTheme === 'dark' ? 'dark-theme actived' : 'light-theme actived'}>
          <AuthContextProvider>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
          </AuthContextProvider>
        </div>
      </ThemeColorContext.Provider>
    </BrowserRouter>
  );
}

export default App;
