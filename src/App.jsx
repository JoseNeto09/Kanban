import './App.css';
import Board from './components/Board';
import Navbar from './components/Navbar';
import ModalTutorial from './components/ModalTutorial';

function App() {
  return (
    <div className="App">
      <ModalTutorial />
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
