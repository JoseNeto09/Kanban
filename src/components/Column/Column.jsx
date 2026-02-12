import { useStore } from '../../store';
import Task from '../Task/Task';
import './Column.css';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { shallow } from 'zustand/shallow';

export default function Column({ state }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [loading, setLoading] = useState(false);

  const normalizedState = state.trim().toLowerCase();

  const emptyMessages = {
    pendente: 'Nenhuma atividade pendente',
    andamento: 'Nenhuma atividade em andamento',
    feito: 'Nenhuma atividade feita',
  };

  const displayNames = {
    pendente: 'PENDENTE',
    andamento: 'ANDAMENTO',
    feito: 'FEITO',
  };

  const { tasks, addTask, setDraggedTask, draggedTask, moveTask } =
    useStore(
      (store) => ({
        tasks: store.tasks.filter(
          (task) => task.status === normalizedState
        ),
        addTask: store.addTask,
        setDraggedTask: store.setDraggedTask,
        draggedTask: store.draggedTask,
        moveTask: store.moveTask,
      }),
      shallow
    );

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      await addTask(title, description, normalizedState);

      setTitle('');
      setDescription('');
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={classNames('column', { drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={() => setDrop(false)}
      onDrop={() => {
        if (!draggedTask) return;

        // Evita mover para mesma coluna
        if (draggedTask.status === normalizedState) {
          setDrop(false);
          return;
        }

        moveTask(draggedTask, normalizedState);
        setDraggedTask(null);
        setDrop(false);
      }}
    >
      {/* Cabeçalho */}
      <div className="titleWrapper">
        <p>{displayNames[normalizedState]}</p>
        <button onClick={() => setOpen(true)}>Adicionar</button>
      </div>

      {/* Lista */}
      <div className="tasksList">
        {tasks.length === 0 && (
          <div className="emptyState">
            {emptyMessages[normalizedState]}
          </div>
        )}

        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="Modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modal-title">Adicionar nova tarefa</h3>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o nome da tarefa"
              autoFocus
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da atividade"
              rows={4}
            />

            <div className="modalButtons">
              <button
                disabled={loading}
                onClick={handleAddTask}
              >
                {loading ? 'Adicionando...' : 'Adicionar'}
              </button>

              <button onClick={() => setOpen(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
