import { useContext } from 'react';
import { ThemeColorContext } from "../contexts/ThemeColorContext";

import { FiMoon, FiSun } from 'react-icons/fi';

import '../styles/switchButton.scss';


/* function switch theme color*/
export function SwitchButton() {

   const {
      colorTheme,
      changeThemeColor
   } = useContext(ThemeColorContext);

   return (

      <button
         id= "SwitchButton"
         className={colorTheme === 'dark' ? 'darkActive' : 'lightActive'}
         onClick={() => changeThemeColor('dark')}
      >
         {colorTheme === "light" ? <FiSun /> : <FiMoon />}
      </button>

   )

}



