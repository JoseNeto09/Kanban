import { create } from "zustand";
import { api } from "../services/api";

export const useStore = create((set, get) => ({
  /* =========================
     STATE
  ========================= */
  tasks: [],
  draggedTask: null,

  /* =========================
     GET /tasks
  ========================= */
  fetchTasks: async () => {
    try {
      const response = await api.get("/tasks");
      set({ tasks: response.data });
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    }
  },

  /* =========================
     POST /tasks
  ========================= */
  addTask: async (title, state) => {
    try {
      const response = await api.post("/tasks", {
        title,
        description: "",
        status: state,
      });

      set({
        tasks: [...get().tasks, response.data],
      });
    } catch (error) {
      console.error("Erro ao criar tarefa", error);
    }
  },

  /* =========================
     DRAG & DROP
  ========================= */
  setDraggedTask: (task) => set({ draggedTask: task }),

  moveTask: async (task, newState) => {
    if (!task) return;

    try {
      const response = await api.put(`/tasks/${task._id}`, {
        status: newState,
      });

      set({
        tasks: get().tasks.map((t) =>
          t._id === task._id ? response.data : t
        ),
      });
    } catch (error) {
      console.error("Erro ao mover tarefa", error);
    }
  },
}));
