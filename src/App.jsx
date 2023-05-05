import { useState, useEffect } from 'react'
import './App.css'
import { getPadTime } from './helpers/getPadTime';

function App() {
  const [time, setTime] = useState('SESSION');

  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isCounting, setIsCounting] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;
  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && 
        setTimeLeft((timeLeft) => {
          if (timeLeft == 0 && time == 'SESSION') {
            return breakLength * 60;      
          }
          else if (timeLeft == 0 && time == 'BREAK') {
            return sessionLength * 60;
          }
          else
            return (timeLeft >= 1 ? timeLeft - 1 : 0)
        })
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [isCounting]);

  useEffect(() => {
    if (timeLeft == 0 && time == 'SESSION') {
      document.getElementById('beep').play();
      setTime('BREAK');
      return;
    }
    if (timeLeft == 0 && time == 'BREAK') {
      document.getElementById('beep').play();
      setTime('SESSION');
    }
  }, [timeLeft]);

  const handleStart = () => {
    setIsCounting(true);
  }

  const handleStop = () => {
    setIsCounting(false);
  }

  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setIsCounting(false);
    setTime('SESSION');
    document.getElementById('beep').stop();
    document.getElementById('beep').currentTime = 0;
  }

  return (

    <div className="App">
      <div className='control-panel'>
        <h1>25 + 5 clock</h1>
        <button id='session-decrement' onClick={() => setSessionLength((length) => (length > 1) ? (length - 1) : 1)} disabled={isCounting}>
          <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><g id="Complete"><g id="arrow-down"><g><polyline data-name="Right" fill="none" id="Right-2" points="7 16.4 12 21.5 17 16.4" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="2.5" y2="19.2"/></g></g></g></svg>
        </button>
        <p id='session-label' style={{marginLeft: '-35px'}}>Session length</p>
        <p id='session-length'>{sessionLength}</p>
        <button id='session-increment' style={{marginRight: '40px'}} onClick={() => setSessionLength((length) => (length < 59) ? (length + 1) : 60)} disabled={isCounting}>
          <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><g id="Complete"><g id="arrow-up"><g><polyline data-name="Right" fill="none" id="Right-2" points="7 7.5 12 2.5 17 7.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="21.3" y2="4.8"/></g></g></g></svg>
        </button>
        <button id='break-decrement' onClick={() => setBreakLength((length) => (length > 1) ? (length - 1) : 1)} disabled={isCounting}>
        <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><g id="Complete"><g id="arrow-down"><g><polyline data-name="Right" fill="none" id="Right-2" points="7 16.4 12 21.5 17 16.4" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="2.5" y2="19.2"/></g></g></g></svg>
        </button>
        <p id='break-label'>Break length</p>
        <p id='break-length'>{breakLength}</p>
        <button id='break-increment' onClick={() => setBreakLength((length) => (length < 59) ? (length + 1) : 60)} disabled={isCounting}>
          <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><g id="Complete"><g id="arrow-up"><g><polyline data-name="Right" fill="none" id="Right-2" points="7 7.5 12 2.5 17 7.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="21.3" y2="4.8"/></g></g></g></svg>
        </button>
      </div>
      <div className='container'>
        <div id='timer-label' style={{fontSize: '2em'}}>{time}</div>
        <div className='timer' id='time-left'>
              <span>{getPadTime(minutes)}</span>
              <span>:</span>
              <span>{getPadTime(seconds)}</span>
        </div>
        {
          (isCounting) 
          ? <button className='stop-button' onClick={() => handleStop()}>STOP</button>
          : <button className='start-button' onClick={() => handleStart()}>START</button>
        }
        <button className='reset-button' onClick={() => handleReset()}>RESET</button>
        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    </div>
  )
}

export default App
