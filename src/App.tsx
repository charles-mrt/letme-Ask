import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeColorContext } from './contexts/ThemeColorContext';


function App() {

  let [colorTheme, setColorTheme] = useState('');

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
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/rooms/new" component={NewRoom} />
              <Route path="/rooms/:id" component={Room} />
            </Switch>
          </AuthContextProvider>
          
        </div>
      </ThemeColorContext.Provider>
    </BrowserRouter>
  );
}

export default App;
