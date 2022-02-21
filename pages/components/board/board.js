import styles from '../../../styles/Board.module.css'
import { useEffect, useState } from 'react'
import {wins} from '../win.conditions';
import Cell from '../cell/cell';

export default function Board({cellsQty, color1, color2, onSomeWon}) {
    const [disabledBoard, setDisabledBoard] = useState(true);

    const [cells, setCells] = useState(() => new Array(cellsQty).fill(""));

    const [turn, setTurn] = useState("X");

    const [player, setPlayer] = useState(null);

    const handleClick = (index) => {
        if (!disabledBoard) {
            return;
        }
      
        if (player && turn !== player) {
            return;
        }

        const cellsCopy = [...cells]

        const cell = cellsCopy[index];

        let nextIndex = index;

        while ((nextIndex + 7) < cellsCopy.length && !cellsCopy[nextIndex + 7]) {
            nextIndex += 7;
        }

        if (cell === "") {
            // if (!player) {
            //   setPlayer(turn)
            //   socket.emit('selectPlayer', turn === "X" ? "O" : "X")
            // }
            setTurn((turn) => (turn === "X" ? "O" : "X"))
            cellsCopy[nextIndex] = turn
            setCells(cellsCopy)

            console.log('move emit');
            // socket.emit('move', { turn, cells: cellsCopy })
        }
    };

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
            onSomeWon(howWon);
            setCells(new Array(cellsQty).fill(""));
        }
    }, [cells]);

    return (
    <div className={styles.board}>  
        {cells?.map(( cell, index) => (
            <Cell key={index} cell={cell} index={index} color1={color1} color2={color2} handleClick={handleClick}></Cell>
        ))}
    </div>
    )
}
