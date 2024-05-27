import './App.css';
import { initGame } from './game';

window.addEventListener('load', initGame);

function App() {
  return <div id="game"></div>;
}

export default App;
