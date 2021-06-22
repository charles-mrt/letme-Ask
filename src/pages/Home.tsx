import illustrationImg from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';


export function Home() {
   
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
               <button className="creat-room">
                  <img src={googleIconImg} alt="Logo do Google" />
                  Crie sua sala com Google
               </button>

               <div className="separator"> Ou entre em uma sala</div>
               <form>
                  <input
                     type="text"
                     placeholder="digite o código da sala"
                  />
                  <button type="submit">
                     Entrar na Sala
                  </button>
               </form>

            </div>
         </main>
   
      </div>
   
   )
}