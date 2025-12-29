import { useStore } from '../store';
import Task from './Task';
import './Column.css';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { shallow } from 'zustand/shallow';

export default function Column({ state }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  // 🔒 NORMALIZA O STATE (ESSENCIAL)
  const normalizedState = state.trim().toUpperCase();

  // 🔹 Mensagens vazias por coluna
  const emptyMessages = {
    PLANEJADO: 'Nenhuma atividade pendente',
    ANDAMENTO: 'Nenhuma atividade em andamento',
    FEITO: 'Nenhuma atividade feita',
  };

  // 🔎 Filtra tasks usando state normalizado
  const tasks = useStore(
    (store) =>
      store.tasks.filter(
        (task) => task.state.trim().toUpperCase() === normalizedState
      ),
    shallow
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  // Fecha o modal com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      className={classNames('column', { drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={() => setDrop(false)}
      onDrop={() => {
        setDrop(false);
        moveTask(draggedTask, normalizedState);
        setDraggedTask(null);
      }}
    >
      {/* Cabeçalho */}
      <div className="titleWrapper">
        <p>{normalizedState}</p>
        <button onClick={() => setOpen(true)} aria-label="Adicionar tarefa">
          Adicionar
        </button>
      </div>

      {/* Lista */}
      <div className="tasksList">
        {tasks.length === 0 && (
          <div className="emptyState">
            {emptyMessages[normalizedState] || 'Nenhuma atividade'}
          </div>
        )}

        {tasks.map((task) => (
          <Task key={task._id} title={task.title} />
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div className="Modal" onClick={() => setOpen(false)}>
          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modalTitle">Adicionar nova tarefa</h3>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite o nome da tarefa..."
              autoFocus
            />

            <div className="modalButtons">
              <button
                className="addBtn"
                onClick={async () => {
                  if (!text.trim()) return;

                  await addTask(text, normalizedState);

                  setText('');
                  setOpen(false);
                }}
              >
                Adicionar
              </button>

              <button
                className="closeBtn"
                onClick={() => setOpen(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
