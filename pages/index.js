import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

import { io } from "socket.io-client";

export default function Home() {
  const socket = io();

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
  
  const wins = [
    // 1st row
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],

    // 2 row
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],

    // 3 row
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],

    // 4 row
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],

    // 5 row
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],

    // 6 row
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],

    //1 column
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],

    //2 column
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],

    //3 column
    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],

    //4 column
    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],

    //5 column
    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],

    //6 column
    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],

    //7 column
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],

    //1 Diagonal
    [3, 9, 15, 21],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [18, 24, 30, 36],
    [13, 19, 25, 31],
    [19, 25, 31, 37],
    [20, 26, 32, 38],

    //2 Diagonal
    [14, 22, 30, 38],
    [7, 15, 23, 31,],
    [15, 23, 31, 39],
    [0, 8, 16, 24,],
    [8, 16, 24, 32],
    [16, 24, 32, 40],
    [1, 9, 17, 25],
    [9, 17, 25, 33],
    [17, 25, 33, 41],
    [2, 10, 18, 26],
    [10, 18, 26, 34],
    [3, 11, 19, 27],    
  ]

  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#1100ff");
  const [historial, setHistorial] = useState({X: 0, O: 0});
  const [disabledBoard, setDisabledBoard] = useState(true);

  const [offline, setOffline] = useState(true);

  const [player, setPlayer] = useState(null);

  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(() => new Array(42).fill(""));

  useEffect(() => {
    const cellsXindex = [];
    const cellsOindex = [];
    let howWon;

    cells.forEach((cell, index) => {
      if (cell === 'X') {
        cellsXindex.push(index);
      }

      if (cell === 'O') {
        cellsOindex.push(index);
      }
    });    

    for (const index in wins) {
      const indexes = wins[index];

      const winSomeX = indexes.every((index) => {
        return cellsXindex.includes(index);
      });

      const winSomeO = indexes.every((index) => {
        return cellsOindex.includes(index);
      });

      if (winSomeO) {
        howWon = 'O';
        break;
      }
      if (winSomeX) {
        howWon = 'X';
        break;
      }
    }

    if (howWon) {
      const copiaHistorial = {...historial};
      copiaHistorial[howWon] += 1;
      setHistorial(copiaHistorial);
      // resetTable();
      setDisabledBoard(false);
    }

  }, [cells]);

  function handleClick(index) {
    if (!disabledBoard) {
      return;
    }

    if (player && !offline && turn !== player) {
      return;
    }

    const cellsCopy = [...cells]

    const cell = cellsCopy[index];

    let nextIndex = index;

    while ((nextIndex + 7) < cellsCopy.length && !cellsCopy[nextIndex + 7]) {
      nextIndex += 7;
    }

    if (cell === "") {
      if (!player) {
        setPlayer(turn)
        socket.emit('selectPlayer', turn === "X" ? "O" : "X")
      }
      setTurn((turn) => (turn === "X" ? "O" : "X"))
      cellsCopy[nextIndex] = turn;
      setCells(cellsCopy);
      socket.emit('move', { turn, cells: cellsCopy })
    }
  }

  const resetTable = () => {
    setCells([...cells].fill(""));
    setTurn("X");
    setDisabledBoard(true);
  }

  const styleColorCoins = (cell) => { 
    return { color: cell == 'X' ? color1 : color2 };
  };

  return (
    <div className={styles.container}>
      {/* <main className={styles.main}>  
        <h1 className={styles.title}>
          Welcome to <Link href="/">4</Link> en Linea
        </h1>
      </main> */}
      <h1 style={styleColorCoins(player)}>Soy: {player}</h1>
      <h1 style={styleColorCoins(player)}>{historial.X} - {historial.O}</h1>
      <h1 style={styleColorCoins(player)}>Es el turno de: {turn}</h1>
      <div className={styles.board}>    
        {cells.map(( cell, index) => (
          <div key={index} className={styles.cell} onClick={() => handleClick(index)}><div style={styleColorCoins(cell)}>{cell}</div><span>{index}</span></div>
        ))}
      </div>

      <div>
        <span>Offline: { offline ? 'true' : 'false' }</span>
      </div>
      
      <button onClick={() =>  resetTable()}>Resetear</button>

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
