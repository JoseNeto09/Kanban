import classNames from 'classnames';
import { useStore } from '../store';
import './Task.css';
import trash from '../assets/trash-2.svg';

export default function Task({ task }) {
  const setDraggedTask = useStore((s) => s.setDraggedTask);
  const deleteTask = useStore((s) => s.deleteTask);

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
      <div className="taskTitle">{task.title}</div>

      <div className="bottomWrapper">
        <small>{formattedDate}</small>

        <div className={classNames('status', task.status)}>
          {task.status}
        </div>

        <img
          src={trash}
          alt="Excluir"
          onClick={() => deleteTask(task._id)}
        />
      </div>
    </div>
  );
}
