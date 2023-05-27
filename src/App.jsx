import { useState, useRef, useEffect } from 'react';
import './index.css';

import clickSound from "../src/sounds/click-sound.mp3";
import stopSound from "../src/sounds/click-sound.mp3";
import restartSound from "../src/sounds/click-sound.mp3";

function App() {
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const intervalRef = useRef();
  const [gameOver, setGameOver] = useState(false); 

  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);
  const [circleSize, setCircleSize] = useState(100);

  const [obstacleX, setObstacleX] = useState(0);
  const [obstacleY, setObstacleY] = useState(0);

  const clickAudioRef = useRef(null);
  const stopAudioRef = useRef(null);
  const restartAudioRef = useRef(null);

  const [difficulty, setDifficulty] = useState(1);
  const [circleClicked, setCircleClicked] = useState(false);


  const handleStart = () => {
    setTimer(0);
    setScore(0);
    setPlaying(true);
    setShowExplanation(false);
    setGameOver(false); 
    startMoving();
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer < 10) {
          return prevTimer + 1;
        } else {
          stopMoving();
          setPlaying(false);
          updateHighestScore();
          setGameOver(true);
          return prevTimer;
        }
      });
    }, 1000);
  };

  const handleCircleClick = (type) => {
    if (playing) {
      if (type === "circle") {
        setScore((prevScore) => prevScore + 1);
      } else if (type === "obstacle") {
        setScore((prevScore) => prevScore + 2);
      }
      setCircleSize((prevSize) => prevSize - 4);
      clickAudioRef.current.play();
      setCircleClicked(true);

      setTimeout(() => {
        setCircleClicked(false);
      }, 500); // Duración de la animación "pulse" en milisegundos
    }
  };

  // const handleStop = () => {
  //   stopMoving();
  //   setPlaying(false);
  //   setTimer(0);
  //   stopAudioRef.current.play();
  // };

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
    }, getIntervalByDifficulty());
  };

  const stopMoving = () => {
    clearInterval(intervalRef.current);
  };

  const updateHighestScore = () => {
    if (score > highestScore) {
      setHighestScore(score);
    }
  };

  const getIntervalByDifficulty = () => {
    switch (difficulty) {
    case 1:
    return 1000; // Nivel fácil: intervalo de 1 segundo
    case 2:
    return 750; // Nivel medio: intervalo de 0.75 segundos
    case 3:
    return 500; // Nivel difícil: intervalo de 0.5 segundos
    default:
    return 1000;
    }
    };
    
    const handleDifficultyChange = (level) => {
    if (!playing) {
    setDifficulty(level);
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
      <div className={`explanation ${showExplanation ? "" : "hidden"}`}>
        <p>Juego de reflejos, donde tienes que ser rápido haciendo click en alguno de los dos círculos:</p>
        <ul>
          <li>El círculo grande vale 1 punto.</li>
          <li>El círculo chico vale 2 puntos.</li>
        </ul>
      </div>
      <section>
        <figure
           className={`circle ${circleClicked ? "clicked" : ""} ${gameOver ? "hidden" : ""}`} // Agregar la clase "hidden" cuando el juego haya terminado
           onClick={() => handleCircleClick("circle")}
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
          className={`obstacle ${gameOver ? "hidden" : ""}`} // Agregar la clase "hidden" cuando el juego haya terminado
          onClick={() => handleCircleClick("obstacle")}
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
    <>
      <button className='btn-play' onClick={handleStart}>Jugar</button>
      <div className="difficulty-buttons">
        <button
          className={`difficulty-button ${difficulty === 1 ? "active" : ""}`}
          onClick={() => handleDifficultyChange(1)}
        >
          Fácil
        </button>
        <button
          className={`difficulty-button ${difficulty === 2 ? "active" : ""}`}
          onClick={() => handleDifficultyChange(2)}
        >
          Medio
        </button>
        <button
          className={`difficulty-button ${difficulty === 3 ? "active" : ""}`}
          onClick={() => handleDifficultyChange(3)}
        >
          Difícil
        </button>
      </div>
    </>
  ) : (
    <></>
    // <button onClick={handleStop}>Detener</button>
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

