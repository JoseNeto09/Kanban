import produce from 'immer';
import { create } from 'zustand';
import {
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';

const store = (set, get) => ({
  /* ========================= */
  /* STATE                     */
  /* ========================= */
  tasks: [],
  draggedTask: null,
  tasksInOngoing: 0,

  /* ========================= */
  /* ACTIONS                   */
  /* ========================= */

  // ➕ Adicionar tarefa (com data/hora)
  addTask: (title, state) =>
    set(
      produce((store) => {
        store.tasks.push({
          title,
          state,
          createdAt: new Date().toISOString(),
        });
      }),
      false,
      'addTask'
    ),

  // ❌ Remover tarefa
  deleteTask: (title) =>
    set(
      produce((store) => {
        store.tasks = store.tasks.filter(
          (task) => task.title !== title
        );
      }),
      false,
      'deleteTask'
    ),

  // 🧲 Task sendo arrastada
  setDraggedTask: (title) =>
    set({ draggedTask: title }, false, 'setDraggedTask'),

  // 🔁 Mover tarefa (preserva createdAt)
  moveTask: (title, newState) =>
    set(
      produce((store) => {
        const task = store.tasks.find(
          (task) => task.title === title
        );

        if (task) {
          task.state = newState;
        }
      }),
      false,
      'moveTask'
    ),

  // 🧹 Limpar todas as tarefas (debug / reset)
  clearTasks: () =>
    set({ tasks: [] }, false, 'clearTasks'),
});

/* ========================= */
/* LOGGER (DEV)              */
/* ========================= */
const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('🧠 ZUSTAND ACTION:', args);
      set(...args);
    },
    get,
    api
  );

/* ========================= */
/* STORE FINAL               */
/* ========================= */
export const useStore = create(
  subscribeWithSelector(
    log(
      persist(devtools(store), {
        name: 'kanban-store',
      })
    )
  )
);

/* ========================= */
/* CONTADOR AUTOMÁTICO       */
/* ========================= */
useStore.subscribe(
  (state) => state.tasks,
  (tasks) => {
    const ongoingCount = tasks.filter(
      (task) => task.state === 'ANDAMENTO'
    ).length;

    if (useStore.getState().tasksInOngoing !== ongoingCount) {
      useStore.setState({
        tasksInOngoing: ongoingCount,
      });
    }
  }
);
