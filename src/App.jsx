import './App.css';
import { useEffect } from 'react';
import { useStore } from './store';

import Board from './components/Board/Board';
import Navbar from './components/Navbar/Navbar';
import ModalTutorial from './components/ModalTutorial/ModalTutorial';
import Footer from './components/Footer/Footer';


function App() {
  const theme = useStore((s) => s.theme); // 'light' ou 'dark'

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="App">
      <ModalTutorial />
      <Navbar />
      <Board />
      <Footer />

    </div>
  );
}

export default App;
