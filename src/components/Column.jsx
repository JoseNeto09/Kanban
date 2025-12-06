import { useStore } from '../store';
import Task from './Task';
import './Column.css';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { shallow } from 'zustand/shallow';

export default function Column({ state }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  // Fecha o modal com tecla ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setOpen(false);
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
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      {/* Cabeçalho da coluna */}
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => setOpen(true)}
          aria-label="Adicionar tarefa"
          title="Adicionar tarefa"
        >
          +
        </button>
      </div>

      {/* Lista de tarefas */}
      <div className="tasksList">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task title={task.title} key={task.title} />)
        ) : (
          <p className="emptyState">Nenhuma tarefa ainda...</p>
        )}
      </div>

      {/* Modal de nova tarefa */}
      {open && (
        <div className="Modal" onClick={() => setOpen(false)}>
          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()} // Evita fechar clicando dentro
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
                onClick={() => {
                  if (text.trim() !== '') {
                    addTask(text, state);
                    setText('');
                    setOpen(false);
                  }
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

// Hook auxiliar (mantido para debug/monitoramento)
function RefTest() {
  const ref = useRef();

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (store) => store.tasks,
      (tasks) => {
        ref.current = tasks;
      }
    );
    return () => unsubscribe();
  }, []);

  return ref.current;
}
