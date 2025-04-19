import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';
let socket: Socket;

function App() {
  const [connected, setConnected] = useState(false);

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

  return (
    <div className='App'>
      <h1>Battleships</h1>
      {connected ? <p>Connected to server</p> : <p>Connecting...</p>}
    </div>
  );
}

export default App;