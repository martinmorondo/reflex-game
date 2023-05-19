import { useState, useRef } from 'react';
import './index.css';

function App() {

  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef();

  // Start the game
  const handleStart = () => {
    setTimer(0);
    setScore(0);
    setPlaying(true);
    startMoving();
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer < 60) {
          return prevTimer + 1; 
        } else {
          clearInterval(intervalRef.current);
          setPlaying(false);
          return prevTimer;
        }
      })
    }, 1000);
  }

  const handleCircleClick = () => {
    if (playing) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setPlaying(false);
    setTimer(0);
  }



  const startMoving = () => {

  }

  
  return (
    <main>
      <header>
        <h1>Reflex game</h1>
        <h2>{timer} Segundos</h2>
      </header>
      <section>
        <figure onClick={handleCircleClick}>
          {score}
        </figure>
      </section>
      <footer>
        {!playing ? (
          <button onClick={handleStart}>Jugar</button> ) 
          : 
          (<button onClick={handleStop}>Detener</button>
        )}      
      </footer>
    </main>
  )
  }

export default App
