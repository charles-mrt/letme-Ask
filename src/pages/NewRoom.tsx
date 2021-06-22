import { useContext } from 'react';
import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import logoThemeDark from '../assets/images/logo-theme-dark.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { SwitchButton } from '../components/SwitchButton';
import { ThemeColorContext } from "../contexts/ThemeColorContext";
import '../styles/auth.scss';


export function NewRoom() {

   const { user } =  useAuth();

   const {
      colorTheme,
      changeThemeColor
   } = useContext(ThemeColorContext);
   
   return (

      <div id="page-auth">
         <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            <strong> Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo-real</p>
         </aside>
         
         <main>
         <SwitchButton />
            <div className="main-content">
            <img src={colorTheme === 'light' ? logoImage : logoThemeDark } alt="Letmeask" />              
               <h2>Criar uma nova sala</h2>             
               
               <form>
                  <input
                     type="text"
                     placeholder="Nome da sala"
                  />
                  <Button type="submit">
                     Criar na Sala
                  </Button>
               </form>
               
               <p>
                  Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
               </p>

            </div>
         </main>
   
      </div>

   )
}