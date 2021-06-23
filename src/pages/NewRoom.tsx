import { useContext, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import logoThemeDark from '../assets/images/logo-theme-dark.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { SwitchButton } from '../components/SwitchButton';
import { ThemeColorContext } from "../contexts/ThemeColorContext";
import '../styles/auth.scss';
import { database } from '../services/firebase';


export function NewRoom() {

   const { user } = useAuth();   
   const history = useHistory();
   const [newRoom, setNewRoom] = useState('');
   const { colorTheme } = useContext(ThemeColorContext);


   async function handleCreateRoom(event: FormEvent) {
      event.preventDefault();

      if (newRoom.trim() === '') {
         return
      }

      const roomRef = database.ref('rooms');

      const firebaseRoom = await roomRef.push({
         title: newRoom,
         authorId: user?.id
      })

      history.push(`/rooms/${firebaseRoom.key}`)
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
               <h2>Criar uma nova sala</h2>

               <form onSubmit={handleCreateRoom}>
                  <input
                     type="text"
                     placeholder="Nome da sala"
                     onChange={event => setNewRoom(event.target.value)}
                     value={newRoom}
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