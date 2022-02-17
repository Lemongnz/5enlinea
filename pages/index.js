import styles from '../styles/Home.module.css'
import { useState } from 'react'






export default function Home() {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(() => new Array(42).fill(""))


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
          Welcome to <a href="https://nextjs.org">4</a> en Linea
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
