import styles from '../styles/Home.module.css'
import { useState } from 'react'

import { io } from "socket.io-client";
import Board from './components/board/board';

const socket = io();

socket.on('connect', () => {
  console.log(socket.id);
})

export default function Home() {
  socket.on('selectPlayer', (data) => {
    if (!player) {
      setPlayer(data)
      setOffline(false)
    }
  })
  
  socket.on('move', (data) => {
    setTurn(data.turn === 'X' ? 'O' : 'X')
    setCells(data.cells)
  })

  const [cellsQty, setCellsQty] = useState(42);

  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#1100ff");

  const [historial, setHistorial] = useState({X: 0, O: 0});

  const [offline, setOffline] = useState(true);

  const [player, setPlayer] = useState();

  const [turn, setTurn] = useState("X");

  const resetTable = () => {
    // setCellsQty(40);
    // setTurn("X");
    // setDisabledBoard(true);
    window.location = '/'; // hasta que sepamos como resetear el componente
  }

  const onSomeWon = (player) => {
    const copiaHistorial = {...historial};
    copiaHistorial[player] += 1;
    setHistorial(copiaHistorial);
    // resetTable();
  }

  return (
    <div className={styles.container}>
      {player && <h1>Soy: {player}</h1>}
      <h1>
        <span style={{color: color1}}>{historial.X}</span>-<span style={{color: color2}}>{historial.O}</span>
      </h1>
      <h1>Es el turno de: {turn}</h1>

      {/* cellsQty, color1, color2: estas 3 son valores de ida (padre a hijo)*/}
      {/* onSomeWon: esta es una funcion de vuelta (hijo al padre)*/}
      <Board cellsQty={cellsQty} color1={color1} color2={color2} onSomeWon={onSomeWon}></Board>

      <span>Offline: { offline ? 'true' : 'false' }</span>
      
      <button onClick={() => resetTable()}>Resetear</button>

      <div>
        <div>
          <span>Jugador 1</span>
          <input id='jugador1' type="color" value={color1} onChange={e => setColor1(e.target.value)} />
        </div>
        <div>
          <span>Jugador 2</span>
          <input id='jugador2' type="color" value={color2} onChange={e => setColor2(e.target.value)} />
        </div>        
      </div>
    </div>
  )
}
