import Column from '../components/Column';
import './Board.css';

export default function Board() {
  return (
    <div className="board-container">
      <div className="columns-container">
        <Column state="PENDENTE" />
        <Column state="ANDAMENTO" />
        <Column state="FEITO" />
      </div>
    </div>
  );
}
