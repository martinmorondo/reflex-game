import { useState, useRef, useEffect } from 'react';
import './index.css';

import clickSound from "../src/sounds/Computer_Mouse_Click_01_Sound_Effect_Mp3_339.mp3";
import stopSound from "../src/sounds/Computer_Mouse_Click_01_Sound_Effect_Mp3_339.mp3";
import restartSound from "../src/sounds/Computer_Mouse_Click_01_Sound_Effect_Mp3_339.mp3";


function App() {
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef();

  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);
  const [circleSize, setCircleSize] = useState(100);

  const [obstacleX, setObstacleX] = useState(0);
  const [obstacleY, setObstacleY] = useState(0);

  const clickAudioRef = useRef(null);
  const stopAudioRef = useRef(null);
  const restartAudioRef = useRef(null);

  const handleStart = () => {
    setTimer(0);
    setScore(0);
    setPlaying(true);
    startMoving();
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer < 10) {
          return prevTimer + 1;
        } else {
          stopMoving();
          setPlaying(false);
          updateHighestScore();
          return prevTimer;
        }
      });
    }, 1000);
  };

  const handleCircleClick = () => {
    if (playing) {
      setScore((prevScore) => prevScore + 1);
      setCircleSize((prevSize) => prevSize - 4);
      clickAudioRef.current.play();
    }
  };

  const handleStop = () => {
    stopMoving();
    setPlaying(false);
    setTimer(0);
    stopAudioRef.current.play();
  };

  const randomPosition = () => {
    const maxX = window.innerWidth - circleSize;
    const maxY = window.innerHeight - circleSize;

    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    setCircleX(newX);
    setCircleY(newY);
  };

  const randomObstaclePosition = () => {
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;

    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    setObstacleX(newX);
    setObstacleY(newY);
  };

  const startMoving = () => {
    randomPosition();
    randomObstaclePosition();

    intervalRef.current = setInterval(() => {
      randomPosition();
      randomObstaclePosition();
    }, 850);
  };

  const stopMoving = () => {
    clearInterval(intervalRef.current);
  };

  const updateHighestScore = () => {
    if (score > highestScore) {
      setHighestScore(score);
    }
  };

  useEffect(() => {
    randomPosition();
  }, []);

  const handleRestart = () => {
    restartAudioRef.current.play();
    window.location.reload();
  };

  return (
    <main>
      <header>
        <h1>Reflex game</h1>
        <h2>{timer} Segundos</h2>
        <h3>Puntaje más alto: {highestScore}</h3>
      </header>
      <section>
        <figure
          className="circle"
          onClick={handleCircleClick}
          style={{
            left: `${circleX}px`,
            top: `${circleY}px`,
            width: `${circleSize}px`,
            height: `${circleSize}px`
          }}
        >
          {score}
        </figure>
        <figure
          className="obstacle"
          onClick={handleCircleClick}
          style={{
            left: `${obstacleX}px`,
            top: `${obstacleY}px`,
            width: "50px",
            height: "50px"
          }}
        >
          {score}
        </figure>
      </section>
      <footer>
        {!playing ? (
          <button onClick={handleStart}>Jugar</button>
        ) : (
          <button onClick={handleStop}>Detener</button>
        )}
        <button onClick={handleRestart} className="btn-restart">
          Reiniciar
        </button>
      </footer>

      <audio ref={clickAudioRef} src={clickSound} />
      <audio ref={stopAudioRef} src={stopSound} />
      <audio ref={restartAudioRef} src={restartSound} />
    </main>
  );
}

export default App;

