import logoImg from '../assets/images/logo.svg'
import deleteImage from '../assets/images/delete.svg'
import { Button } from '../components/button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question/index';
import { useParams, useHistory } from 'react-router-dom'
import '../styles/room.scss';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
  id: string
}

export function AdminRoom(){
  //const { user } = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const {title, questions} = useRoom(roomId)
  
  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      andedAt: new Date(),
    })

    history.push(`/`)
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask"/>
          <div>
            <RoomCode code={roomId}/>
            <Button onClick={handleEndRoom} isOutLined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list"></div>      
          {questions.map(question => {
            return (
              <Question
              key = {question.id}
              content= {question.content}
              author= {question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImage} alt="Remover pergunta"/>
                </button>  
              </Question>
            )
          })}
      </main>
    </div>
  );
}