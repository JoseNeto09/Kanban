import { create } from 'zustand';

const API_URL = 'http://localhost:3333/tasks';

export const useStore = create((set) => ({
  tasks: [],
  draggedTask: null,
  loading: true,

  /* ========================= */
  /* DRAG                      */
  /* ========================= */
  setDraggedTask: (task) => set({ draggedTask: task }),

  /* ========================= */
  /* BUSCAR TASKS              */
  /* ========================= */
  fetchTasks: async () => {
    set({ loading: true });

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      set({
        tasks: Array.isArray(data) ? data : [],
        loading: false,
      });
    } catch (error) {
      console.error('Erro ao buscar tasks:', error);
      set({ loading: false });
    }
  },

  /* ========================= */
  /* ADICIONAR TASK            */
  /* ========================= */
  addTask: async (title, description, status) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          status: status.trim().toUpperCase(),
        }),
      });

      const newTask = await response.json();

      // 🔴 segurança
      if (!newTask || !newTask._id) return;

      set((store) => ({
        tasks: [...store.tasks, newTask],
      }));
    } catch (error) {
      console.error('Erro ao adicionar task:', error);
    }
  },

  /* ========================= */
  /* MOVER TASK                */
  /* ========================= */
  moveTask: async (task, newStatus) => {
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus.trim().toUpperCase(),
        }),
      });

      const updatedTask = await response.json();

      set((store) => ({
        tasks: store.tasks.map((t) =>
          t._id === updatedTask._id ? updatedTask : t
        ),
      }));
    } catch (error) {
      console.error('Erro ao mover task:', error);
    }
  },

  /* ========================= */
  /* REMOVER TASK              */
  /* ========================= */
  deleteTask: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

      set((store) => ({
        tasks: store.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error('Erro ao deletar task:', error);
    }
  },
}));
