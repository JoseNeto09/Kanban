import classNames from 'classnames';
import { useStore } from '../../store';
import '../Task/Task.css';
import trash from '../../assets/trash-2.svg';

export default function Task({ task }) {
  const setDraggedTask = useStore((s) => s.setDraggedTask);
  const deleteTask = useStore((s) => s.deleteTask);

  if (!task) return null;

  const date = new Date(task.createdAt);

  const formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'short',   // seg., ter., qua...
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
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
        <small className="taskDate">
          {formattedDate} • {formattedTime}
        </small>

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
