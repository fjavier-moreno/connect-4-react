import { Token } from "./Token"

export function WinnerModal({ winner, resetGame }) {

    if (winner === null) return null

    const winnerText = winner === false ? 'Empate' : 'Ganó: '

    return (
        <section>
            {
                <section className='winner'>
                    <div className='text'>
                        <h2>{winnerText}</h2>
                        <header className='win'>
                            {winner && <Token player={winner} isSelected />}
                        </header>
                        <footer>
                            <button onClick={resetGame}>Empezar de nuevo</button>
                        </footer>
                    </div>
                </section>
            }
        </section>
    )
}