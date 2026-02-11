import './App.css';
import { useEffect } from 'react';
import { useStore } from './store';

import Board from './components/Board/Board';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import IntroModal from './components/IntroModal/IntroModal';

function App() {
  const theme = useStore((s) => s.theme); // 'light' ou 'dark'

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="App">
      <Navbar />
      <IntroModal /> 
      <Board />
      <Footer />

    </div>
  );
}

export default App;
