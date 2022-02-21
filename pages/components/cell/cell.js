import styles from '../../../styles/Board.module.css'

export default function Cell({cell, index, color1, color2, handleClick}) {
    const styleColorPlayers = (cell) => { 
        return { color: cell == 'X' ? color1 : color2 };
    };

    return (
        <div className={styles.cell} onClick={() => handleClick(index)}><div style={styleColorPlayers(cell)}>{cell}</div><span>{index}</span></div>
    )
}
