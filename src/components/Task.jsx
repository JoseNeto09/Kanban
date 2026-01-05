import classNames from 'classnames';
import { useStore } from '../store';
import './Task.css';
import trash from '../assets/trash-2.svg';

export default function Task({ task }) {
  const setDraggedTask = useStore((s) => s.setDraggedTask);
  const deleteTask = useStore((s) => s.deleteTask);

  if (!task) return null;

  const formattedDate = new Date(task.createdAt).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task)}
    >
      {/* Título */}
      <div className="taskTitle">{task.title}</div>

      {/* Rodapé */}
      <div className="bottomWrapper">
        <small className="taskDate">{formattedDate}</small>

        <div
          className={classNames(
            'status',
            task.status?.toLowerCase()
          )}
        >
          {task.status}
        </div>

        <img
          src={trash}
          alt="Excluir tarefa"
          onClick={() => deleteTask(task._id)}
        />
      </div>
    </div>
  );
}
