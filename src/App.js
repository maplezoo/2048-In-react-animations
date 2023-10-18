import logo from './logo.svg';
import './App.css';
import { Tile } from './components/Tiles/Tile'

function App() {
  const list = [];
  for (let i = 2; i <= 2048; i = i * 2) {
    list.push(i);
  }
  return (
    <div className='container'>
      <h1>Hello World</h1>
      {list.map((v) => {
        return <Tile value={v} />
      })}
    </div>
  );
}

export default App;
