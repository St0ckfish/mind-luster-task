import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  taskId: string | null;
  mode: "create" | "edit";
  columnType: string | null;
  openModal: (
    mode: "create" | "edit",
    taskId?: string,
    columnType?: string,
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  taskId: null,
  mode: "create",
  columnType: null,
  openModal: (mode, taskId, columnType) =>
    set({
      isOpen: true,
      mode,
      taskId: taskId ?? null,
      columnType: columnType ?? null,
    }),
  closeModal: () => set({ isOpen: false, taskId: null, columnType: null }),
}));
