import { useContext } from 'react';
import { ThemeColorContext } from "../contexts/ThemeColorContext";

import { FiMoon, FiSun } from 'react-icons/fi';

import '../styles/switchButton.scss';


/* function switch theme color*/
export function SwitchButton() {

   const { theme, toggleTheme } = useContext(ThemeColorContext);

   return (

      <button
         id= "SwitchButton"
         className={theme === 'dark' ? 'darkActive' : 'lightActive'}
         onClick={() => toggleTheme()}
      >
         {theme === "light" ? <FiSun /> : <FiMoon />}
      </button>

   )

}



