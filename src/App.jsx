import { useState, useRef, useEffect } from 'react';
import './index.css';

function App() {

  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef();

  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);

  // Start the game
  const handleStart = () => {
    setTimer(0);
    setScore(0);
    setPlaying(true);
    startMoving();
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer < 30) {
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
    stopMoving();
    setPlaying(false);
    setTimer(0);
  }

  const randomPosition = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;

    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    setCircleX(newX);
    setCircleY(newY);
  }

  const startMoving = () => {
    randomPosition();

    intervalRef.current = setInterval(() => {
      randomPosition();
    }, 2000);
  }

  const stopMoving = () => {
    clearInterval(intervalRef.current);
  }

  useEffect(() => {
    randomPosition();
  }, []);

  
  return (
    <main>
      <header>
        <h1>Reflex game</h1>
        <h2>{timer} Segundos</h2>
      </header>
      <section>
        <figure onClick={handleCircleClick} style={{ left: `${circleX}px`, top: `${circleY}px` }}>
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
