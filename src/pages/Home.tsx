import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import logoThemeDark from '../assets/images/logo-theme-dark.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { SwitchButton } from '../components/SwitchButton';
import { useAuth } from '../hooks/useAuth';
import { ThemeColorContext } from "../contexts/ThemeColorContext";

import '../styles/auth.scss';



export function Home() {

   const history = useHistory();
   const { user, signInWithGoogle } = useAuth();

   // redirect user if logged in
   async function handleCreateRoom() {
      if (!user) {
         await signInWithGoogle();
      }
      history.push('/rooms/new');
   }

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

               <button
                  className="creat-room"
                  onClick={handleCreateRoom}
               >
                  <img src={googleIconImg} alt="Logo do Google" />
                  Crie sua sala com Google
               </button>

               <div className="separator"> Ou entre em uma sala</div>
               <form>
                  <input
                     type="text"
                     placeholder="digite o código da sala"
                  />
                  <Button type="submit">
                     Entrar na Sala
                  </Button>
               </form>

            </div>
         </main>

      </div>

   )
}