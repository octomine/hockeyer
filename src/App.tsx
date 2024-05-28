import './App.css';
import { AppContainer } from './components/app';
import { initGame } from './game';

window.addEventListener('load', initGame);

function App() {
  return <AppContainer></AppContainer>;
}

export default App;
