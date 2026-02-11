import { useEffect } from 'react';
import { useStore } from '../../store';
import Column from '../Column/Column';
import './Board.css';

export default function Board() {
  const fetchTasks = useStore((s) => s.fetchTasks);
  const loading = useStore((s) => s.loading);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return <div className="board-loading">Carregando tarefas...</div>;
  }

  return (
    <div className="board-container">
      <div className="columns-container">
        <Column state="pendente" />
        <Column state="andamento" />
        <Column state="feito" />
      </div>
    </div>
  );
}