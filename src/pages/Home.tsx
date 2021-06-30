import {useHistory} from 'react-router-dom';
import illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/button'
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss'


export function Home(){
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  function handleCreateRoom(){
    if(!user){
      signInWithGoogle()
    }
    history.push('/rooms/new')
  }
  return(
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask"/>
          <button onClick={handleCreateRoom} className='crate-room'>
            <img src={googleIconImg} alt="Letmeask"/> Crie sua sala com a google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o codigo da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}