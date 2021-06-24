import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LogoTheme } from '../components/LogoTheme';
import { Button } from '../components/Button';
import { SwitchButton } from '../components/SwitchButton';
import { RoomCode } from '../components/RoomCode';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';

import { FiThumbsUp } from 'react-icons/fi';


import '../styles/room.scss';




type RoomParams = {
   id: string;
}

export function Room() {

   const { user } = useAuth();
   const params = useParams<RoomParams>();
   const roomId = params.id;

   const { title, questions } = useRoom(roomId);

   const [newQuestion, setNewQuestion] = useState('');

   async function handleSendQuestion(event: FormEvent) {

      event.preventDefault();

      if (newQuestion.trim() === '') {
         return;
      }

      if (!user) {
         throw new Error('you must be logged in 🤭');
      }

      const question = {
         content: newQuestion,
         author: {
            name: user.name,
            avatar: user.avatar,
         },
         isHighLigted: false,
         isAnswered: false
      };

      await database.ref(`rooms/${roomId}/questions`).push(question);

      //clean question
      setNewQuestion('');
   }

   async function handleLikeQuestion(questionId: string, likeId: string | undefined) {

      if (likeId) {
         await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
      } else {
         await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
            authorId: user?.id
         })
      }
   }

   return (
      <div id="page-room">
         <header>
            <SwitchButton />
            <div className="content">
               <LogoTheme />
               <RoomCode code={roomId} />
            </div>
         </header>

         <main className="content">
            <div className="room-title">
               <h1>Sala {title}</h1>
               {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
            </div>

            <form onSubmit={handleSendQuestion}>
               <textarea
                  placeholder="O que você quer perguntar?"
                  onChange={event => setNewQuestion(event.target.value)}
                  value={newQuestion}
               />

               <div className="form-footer">
                  {user ? (
                     <div className="user-info">
                        <img src={user.avatar} alt={user.name} />
                        <span>{user.name}</span>
                     </div>
                  ) : (
                        <span>
                           Para enviar uma pergunta,
                           <button> faça seu login</button>.
                        </span>
                     )}

                  <Button type="submit" disabled={!user}>Enviar pergunta</Button>

               </div>
            </form>

            <div className="question-list">
               {questions.map(question => {
                  return (
                     <Question
                        key={question.id}
                        content={question.content}
                        author={question.author}
                     >
                        <button
                           className={`like-button ${question.likeId ? 'liked' : ''}`}
                           type="button"
                           aria-label="Marcar como gostei"
                           onClick={() => handleLikeQuestion(question.id, question.likeId)}
                        >
                           { question.likeCount > 0 && <span>{question.likeCount}</span> }
                          
                          <FiThumbsUp/>
                          
                        </button>

                     </Question>
                  );
               })}
            </div>

         </main>

      </div>
   );
}