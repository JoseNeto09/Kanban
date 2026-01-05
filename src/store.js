import { create } from 'zustand';

const API_URL = 'http://localhost:3333/tasks';

export const useStore = create((set) => ({
  tasks: [],
  draggedTask: null,
  loading: true,

  setDraggedTask: (task) => set({ draggedTask: task }),

  fetchTasks: async () => {
    set({ loading: true });

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      set({ tasks: data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  addTask: async (title, status) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description: '',
        status,
      }),
    });

    const newTask = await response.json();

    set((store) => ({
      tasks: [...store.tasks, newTask],
    }));
  },

  moveTask: async (task, newStatus) => {
    if (!task) return;

    const response = await fetch(`${API_URL}/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    const updatedTask = await response.json();

    set((store) => ({
      tasks: store.tasks.map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      ),
    }));
  },

  deleteTask: async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    set((store) => ({
      tasks: store.tasks.filter((task) => task._id !== id),
    }));
  },
}));
