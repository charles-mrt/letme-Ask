import {useContext} from 'react';
import { ThemeColorContext } from "../contexts/ThemeColorContext";
import logoImage from '../assets/images/logo.svg';
import logoThemeDark from '../assets/images/logo-theme-dark.svg';

export function LogoTheme() {

   const { theme } = useContext(ThemeColorContext);

   return (
      <img src={theme === 'light' ? logoImage : logoThemeDark} alt="Letmeask" />
   );
}