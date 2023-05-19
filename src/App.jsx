import { useState, useRef } from 'react';
import './index.css';

function App() {

  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef();


  return (
    <main>
      <header>
        <h1>Reflex game</h1>
      </header>
    </main>
  )
}

export default App
