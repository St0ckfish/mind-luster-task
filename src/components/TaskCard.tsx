import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Task } from "~/types/task";
import { useModalStore } from "~/store/modalStore";
import { useDeleteTask } from "~/hooks/useTasks";

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const deleteTask = useDeleteTask();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    setShowDeleteDialog(false);

    setTimeout(() => {
      void deleteTask.mutateAsync(task.id);
    }, 300);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal("edit", task.id);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              mb: 2,
              cursor: "grab",
              backgroundColor: snapshot.isDragging ? "#f0f7ff" : "white",
              boxShadow: snapshot.isDragging
                ? "0 8px 16px rgba(0,0,0,0.15)"
                : "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              opacity: isDeleting ? 0 : 1,
              transform: isDeleting
                ? "scale(0.8)"
                : snapshot.isDragging
                  ? "rotate(2deg)"
                  : "none",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              },
              "&:active": {
                cursor: "grabbing",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5, ml: 1 }}>
                  <IconButton size="small" onClick={handleEdit} color="primary">
                    <Edit size={18} />
                  </IconButton>
                  <IconButton size="small" onClick={handleDelete} color="error">
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Draggable>

      <Dialog
        open={showDeleteDialog}
        onClose={cancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>&quot;{task.title}&quot;</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={cancelDelete}
            variant="outlined"
            disabled={deleteTask.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            autoFocus
            disabled={deleteTask.isPending}
            startIcon={
              deleteTask.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {deleteTask.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
