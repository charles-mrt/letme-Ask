import { useHistory, useParams } from 'react-router-dom';

import { LogoTheme } from '../components/LogoTheme';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { SwitchButton } from '../components/SwitchButton';
import { RoomCode } from '../components/RoomCode';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { Question } from '../components/Question';

import '../styles/room.scss';


type RoomParams = {
   id: string;
}

export function AdminRoom() {
   const history = useHistory();
   const { user } = useAuth();
   const params = useParams<RoomParams>();
   const roomId = params.id;

   const { title, questions } = useRoom(roomId);


   async function handleEndRoom() {
      await database.ref(`rooms/${roomId}`).update({
         endedAt: new Date(),
      })

      history.push('/');
   }

   async function handleDeleteQuestion(questionId: string) {
      if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
         await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
      }
   }

   return (
      <div id="page-room">
         <header>
            <SwitchButton />
            <div className="content">
               <LogoTheme />
               <div>
                  <RoomCode code={roomId} />
                  <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
               </div>
            </div>
         </header>

         <main className="content">
            <div className="room-title">
               <h1>Sala {title}</h1>
               {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
            </div>

            <div className="question-list">
               {questions.map(question => {
                  return (
                     <Question
                        key={question.id}
                        content={question.content}
                        author={question.author}
                     >

                        <button
                           type="button"
                           onClick={() => handleDeleteQuestion(question.id)}
                        >
                           <img src={deleteImg} alt="Remover pergunta" />
                        </button>

                     </Question>
                  );
               })}
            </div>

         </main>

      </div>
   );
}