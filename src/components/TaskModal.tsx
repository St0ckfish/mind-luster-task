import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { useModalStore } from "~/store/modalStore";
import { useCreateTask, useUpdateTask, useTask } from "~/hooks/useTasks";
import type { ColumnType } from "~/types/task";

const columns: { value: ColumnType; label: string }[] = [
  { value: "backlog", label: "Backlog" },
  { value: "in-progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
];

export const TaskModal = () => {
  const { isOpen, mode, taskId, columnType, closeModal } = useModalStore();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const { data: existingTask } = useTask(taskId ?? "");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [column, setColumn] = useState<ColumnType>("backlog");

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setColumn(existingTask.column);
    } else if (mode === "create") {
      setTitle("");
      setDescription("");
      setColumn((columnType as ColumnType) ?? "backlog");
    }
  }, [isOpen, mode, taskId, existingTask, columnType]);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setColumn("backlog");
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title?.trim()) {
      return;
    }

    if (mode === "create") {
      await createTask.mutateAsync({
        title: title?.trim() || "",
        description: description?.trim() || "",
        column,
      });
    } else if (mode === "edit" && taskId) {
      await updateTask.mutateAsync({
        id: taskId,
        task: {
          title: title?.trim() || "",
          description: description?.trim() || "",
          column,
        },
      });
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {mode === "create" ? "Create New Task" : "Edit Task"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              select
              label="Column"
              value={column}
              onChange={(e) => setColumn(e.target.value as ColumnType)}
              fullWidth
            >
              {columns.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              !title?.trim() || createTask.isPending || updateTask.isPending
            }
          >
            {createTask.isPending || updateTask.isPending
              ? "Saving..."
              : mode === "create"
                ? "Create"
                : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
