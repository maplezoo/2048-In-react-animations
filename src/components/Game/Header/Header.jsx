import './Header.css';

const Header = ({ score, bestScore, reset }) => {
    return (
        <div class="heading">
            <h1 class="title">2048</h1>
            <div class="scores-container">
                <div class="score-container">
                    <p>Score</p>
                    <p>{score}</p>
                </div>
                <div class="best-container">
                    <p>Best</p>
                    <p>{bestScore}</p>
                </div>
            </div>
            <h3 className='copy-right'>@Maple Zhu</h3>
            <button className='button-reset' onClick={reset}>New Game</button>
        </div>

    );
}

export default Header;