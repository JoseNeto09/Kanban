import './App.css';
import { useEffect } from 'react';
import { useStore } from './store';

import Board from './components/Board';
import Navbar from './components/Navbar';
import ModalTutorial from './components/ModalTutorial';
import Footer from './components/Footer';


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
