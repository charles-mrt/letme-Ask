import { useParams } from 'react-router-dom';

import { LogoTheme } from '../components/LogoTheme';
import { Button } from '../components/Button';
import { SwitchButton } from '../components/SwitchButton';
import { RoomCode } from '../components/RoomCode';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';
import { Question } from '../components/Question';



type RoomParams = {
   id: string;
}

export function AdminRoom() {

   const { user } = useAuth();
   const params = useParams<RoomParams>();
   const roomId = params.id;
   
   const { title, questions } = useRoom(roomId);

   return (
      <div id="page-room">
         <header>
            <SwitchButton />
            <div className="content">
               <LogoTheme />
               <div>
                  <RoomCode code={roomId} />
                  <Button isOutlined>Encerrar Sala</Button>
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
                     />
                  );
               })}
            </div>

         </main>

      </div>
   );
}