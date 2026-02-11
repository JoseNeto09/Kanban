import { create } from 'zustand';

const API_URL = 'http://localhost:3333/tasks';

export const useStore = create((set) => ({
  tasks: [],
  draggedTask: null,
  loading: true,

  setDraggedTask: (task) => set({ draggedTask: task }),

  fetchTasks: async () => {
    console.log('🔍 Buscando tasks...');
    set({ loading: true });

    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Tasks recebidas:', data);

      set({
        tasks: Array.isArray(data) ? data : [],
        loading: false,
      });
    } catch (error) {
      console.error('❌ Erro ao buscar tasks:', error);
      set({ tasks: [], loading: false });
    }
  },

  addTask: async (title, description, status) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          status: status.toLowerCase(), // pendente, andamento, feito
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTask = await response.json();

      if (!newTask || !newTask._id) return;

      set((store) => ({
        tasks: [...store.tasks, newTask],
      }));
    } catch (error) {
      console.error('❌ Erro ao adicionar task:', error);
    }
  },

  moveTask: async (task, newStatus) => {
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus.toLowerCase(), // pendente, andamento, feito
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTask = await response.json();

      set((store) => ({
        tasks: store.tasks.map((t) =>
          t._id === updatedTask._id ? updatedTask : t
        ),
      }));
    } catch (error) {
      console.error('❌ Erro ao mover task:', error);
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      set((store) => ({
        tasks: store.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error('❌ Erro ao deletar task:', error);
    }
  },
}));