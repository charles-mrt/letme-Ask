import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../App';
import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';


import { Button } from '../components/Button';

import '../styles/auth.scss';


export function Home() {

   const history = useHistory();
   const { user, signInWithGoogle } = useContext(AuthContext);

   // redirect user if logged in
   async function handleCreateRoom() {
      if (!user) {
         await signInWithGoogle();
      }
      history.push('/rooms/new');
   }


   return (

      <div id="page-auth">
         <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            <strong> Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo-real</p>
         </aside>

         <main>
            <div className="main-content">
               <img src={logoImage} alt="Letmeask" />

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