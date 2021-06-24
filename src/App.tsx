import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeColorContextProvider } from './contexts/ThemeColorContext';


function App() {

  return (
    <BrowserRouter>
      <ThemeColorContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
          </Switch>
        </AuthContextProvider>
      </ThemeColorContextProvider>
    </BrowserRouter>
  );
}

export default App;
