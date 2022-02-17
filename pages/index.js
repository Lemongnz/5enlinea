import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Link from 'next/link';



export default function Home() {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(() => new Array(42).fill(""))


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
    [20, 27, 34, 41],


    
  ]



  function handleClick(index) {
    const cell = cells[index];

    if (cell === "") {
      setTurn((turn) => (turn === "X" ? "O" : "X"))
      cells[index] = turn;
    } 
  }
  

  return (
    <div className={styles.container}>
      <main className={styles.main}>  
        <h1 className={styles.title}>
          Welcome to <Link href="/">4</Link> en Linea
        </h1>
      </main>
      <h1>Es el turno de: {turn}</h1>
      <div className={styles.board}>    
        {cells.map(( cell, index) => (
          <div key={index} className={styles.cell} onClick={() => handleClick(index)}>{cell}<span>{index}</span></div>         
        ))}
      </div>
    </div>
  )
}
