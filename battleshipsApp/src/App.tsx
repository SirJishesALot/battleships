import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';
import GameBoard, { CellState } from './components/GameBoard';
let socket: Socket;

const generateEmptyBoard = (rows: number, cols: number): CellState[][] => {
  return Array.from({ length: rows }, () => Array(cols).fill('empty'));
}; 

function App() {
  const [connected, setConnected] = useState(false);
  const [board, setBoard] = useState<CellState[][]>(generateEmptyBoard(10, 10));

  useEffect(() => {
    socket = io('http://localhost:3001');

    socket.on('connect', () => {
      setConnected(true);
      console.log('Connected:', socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCellClick = (row: number, col: number) => {
    setBoard(prev => {
      const newBoard = prev.map(r => [...r]);
      const current = newBoard[row][col];

      if (current === 'empty') newBoard[row][col] = 'miss';
      else if (current === 'ship') newBoard[row][col] = 'hit';

      return newBoard;
    });
  }; 

  return (
    <div className='App'>
    { connected ? (
      <div style={{ padding: '1rem' }}>
        <h1>Your Board</h1>
        <GameBoard board={board} isInteractive onCellClick={handleCellClick} />
      </div>
    ) : (
      <div>
        <h1>Connecting...</h1>
        <p>Please wait while we establish a connection to the server.</p>
      </div>
    )
    }
    </div>
  )
}

export default App;