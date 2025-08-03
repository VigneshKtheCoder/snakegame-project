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
    head.y += direction.y;if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= boardSize ||
      head.y >= boardSize ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      clearInterval(intervalRef.current);
      return snake;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
    } else {
      newSnake.pop();
    }
    return newSnake;
  }

  const handleRestart = () => {
    setSnake(initialSnake);
    setFood(generateFood());
    setGameOver(false);
    setDirection(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Snake Game</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${boardSize}, 25px)`,
          width: boardSize * 25,
          margin: "20px auto",
          border: "2px solid #444",
          backgroundColor: "#f0f0f0",
        }}
      >
        {[...Array(boardSize * boardSize)].map((_, i) => {
          const x = i % boardSize;
          const y = Math.floor(i / boardSize);
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              style={{
                width: 25,
                height: 25,
                backgroundColor: isSnake ? "green" : isFood ? "red" : "white",
                border: "1px solid #ddd",
              }}
            ></div>
          );
        })}
      </div>
      {gameOver && <h2 style={{ color: "red" }}>Game Over!</h2>}
      <button onClick={handleRestart} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Restart
      </button>
    </div>
  );
};

export default SnakeGame;