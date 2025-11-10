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

  return (
    <div
      className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      {/* Cabeçalho da coluna */}
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>+</button>
      </div>

      {/* Lista de tarefas */}
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}

      {/* Modal */}
      {open && (
        <div className="Modal" onClick={() => setOpen(false)}>
          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
          >
            {/* 🔹 Título do modal */}
            <h3 className="modalTitle">Adicionar nova tarefa</h3>

            {/* Campo de texto */}
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Digite o nome da tarefa..."
            />

            {/* Botões lado a lado */}
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

function RefTest() {
  const ref = useRef();

  useEffect(() => {
    useStore.subscribe(
      (store) => store.tasks,
      (tasks) => {
        ref.current = tasks;
      }
    );
  }, []);

  return ref.current;
}
