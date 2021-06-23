import { FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import logoThemeDark from '../assets/images/logo-theme-dark.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { SwitchButton } from '../components/SwitchButton';

import { useAuth } from '../hooks/useAuth';

import { ThemeColorContext } from "../contexts/ThemeColorContext";

import { database } from '../services/firebase';

import '../styles/auth.scss';
import { BADFAMILY } from 'dns';




export function Home() {

   const history = useHistory();
   const { user, signInWithGoogle } = useAuth();
   const { colorTheme } = useContext(ThemeColorContext);
   const [roomCode, setRoomCode] = useState('');

   // redirect user if logged in
   async function handleCreateRoom() {
      if (!user) {
         await signInWithGoogle();
      }
      history.push('/rooms/new');
   }

   // get room if exist
   async function handleJoinRoom(event: FormEvent) {
      event.preventDefault();

      if (roomCode.trim() === '') {
         return;
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      if (!roomRef.exists()) {
         alert("Room | " + roomCode + " | does not exist 😢 "); 
         return;
      }

      history.push(`/rooms/${roomCode}`);
   }


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
               <img src={colorTheme === 'light' ? logoImage : logoThemeDark} alt="Letmeask" />

               <button
                  className="creat-room"
                  onClick={handleCreateRoom}
               >
                  <img src={googleIconImg} alt="Logo do Google" />
                  Crie sua sala com Google
               </button>

               <div className="separator"> Ou entre em uma sala</div>

               <form onSubmit={handleJoinRoom}>
                  <input
                     type="text"
                     placeholder="digite o código da sala"
                     onChange={event => setRoomCode(event.target.value)}
                     value={roomCode}
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