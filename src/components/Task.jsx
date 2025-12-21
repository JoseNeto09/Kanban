import classNames from 'classnames';
import { useStore } from '../store';
import './Task.css';
import trash from '../assets/trash-2.svg';

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  if (!task) return null;

  // 🕒 Formata data e hora
  const formattedDate = new Date(task.createdAt).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task.title)}
    >
      {/* Título */}
      <div className="taskTitle">{task.title}</div>

      {/* Rodapé */}
      <div className="bottomWrapper">
        <small className="taskDate">{formattedDate}</small>

        <div className={classNames('status', task.state)}>
          {task.state}
        </div>

        <img
          src={trash}
          alt="Excluir tarefa"
          onClick={() => deleteTask(task.title)}
        />
      </div>
    </div>
  );
}
