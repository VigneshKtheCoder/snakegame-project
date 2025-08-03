import React, { useEffect, useState, useRef } from "react";

const SnakeGame = () => {
  const boardSize = 20;
  const initialSnake = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
  ];
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState(null);
  const [food, setFood] = useState(generateFood);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef(null);

  function generateFood() {
    return {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!direction) return;
    intervalRef.current = setInterval(() => {
      setSnake((prev) => moveSnake(prev));
    }, 200);
    return () => clearInterval(intervalRef.current);
  }, [direction]);

  function moveSnake(snake) {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;