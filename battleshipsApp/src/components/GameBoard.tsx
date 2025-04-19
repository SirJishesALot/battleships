import React from 'react';
import './GameBoard.css';

export type CellState = 'empty' | 'hit' | 'miss' | 'ship';

type GameBoardProps = {
  board: CellState[][];
  isInteractive?: boolean; 
  onCellClick?: (row: number, col: number) => void;
};

const GameBoard: React.FC<GameBoardProps> = ({ board, isInteractive = false, onCellClick }) => {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => {
            const handleClick = () => {
              if (isInteractive && onCellClick) {
                onCellClick(rowIndex, colIndex);
              }
            };

            return (
              <div
                key={colIndex}
                className={`cell ${cell}`}
                onClick={handleClick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;