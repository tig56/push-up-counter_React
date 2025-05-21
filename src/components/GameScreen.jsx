import React, { useState, useEffect, useRef } from 'react';

function GameScreen({ onGameEnd }) {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [calories, setCalories] = useState(0);
  const [started, setStarted] = useState(false);
  const timerRef = useRef(null);
  const touchHandled = useRef(false);

  const startSound = useRef(new Audio('/メニューを開く2.mp3'));
  const countSound = useRef(new Audio('/決定ボタンを押す26.mp3'));

  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && started) {
      onGameEnd(count);
    }
    return () => clearTimeout(timerRef.current);
  }, [started, timeLeft]);

  const handleStart = () => {
    startSound.current.play();
    setCount(0);
    setCalories(0);
    setTimeLeft(10);
    setStarted(true);
  };

  const handleCount = () => {
    if (!started || timeLeft === 0) return;
    countSound.current.play();
    setTimeLeft(10);
    setCount(prev => prev + 1);
    setCalories(prev => +(prev + 0.42).toFixed(2));
  };

  const handleTouchStart = () => {
    if (touchHandled.current) return;
    touchHandled.current = true;
    handleCount();
  };

  const handleClick = () => {
    if (touchHandled.current) {
      touchHandled.current = false; // フラグリセット
      return;
    }
    handleCount();
  };

  return (
    <div
      className="container"
      onTouchStart={handleTouchStart}
      onClick={handleClick}
    >
      <h1>腕立てカウンター</h1>
      <div id="count">{count}</div>
      <p id="reminder">残り時間 <span id="timer">{timeLeft}</span>秒</p>
      <button id="countBtn"></button>
      <button id="startBtn" onClick={handleStart} disabled={started}>スタート</button>
      <p id="consume">消費カロリー<span id="calories">{calories.toFixed(2)}</span>kcal</p>
    </div>
  );
}

export default GameScreen;
