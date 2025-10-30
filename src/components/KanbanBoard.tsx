import { useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "./KanbanColumn";
import { useTasks, useUpdateTask } from "~/hooks/useTasks";
import type { Task, ColumnType } from "~/types/task";
import Loader from "./Loader";

const columns: { id: ColumnType; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export const KanbanBoard = () => {
  const { data: serverTasks = [], isLoading } = useTasks();
  const updateTask = useUpdateTask();

  const [localTasks, setLocalTasks] = useState<Task[]>([]);

  useEffect(() => {
    setLocalTasks(serverTasks);
  }, [serverTasks]);

  const tasksByColumn = useMemo(() => {
    const grouped: Record<ColumnType, Task[]> = {
      backlog: [],
      "in-progress": [],
      review: [],
      done: [],
    };

    localTasks.forEach((task) => {
      if (grouped[task.column]) {
        grouped[task.column].push(task);
      }
    });

    return grouped;
  }, [localTasks]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      const movedTask = localTasks.find((task) => task.id === draggableId);

      if (!movedTask) return;

      setLocalTasks((prev) =>
        prev.map((task) =>
          task.id === draggableId
            ? { ...task, column: destination.droppableId as ColumnType }
            : task,
        ),
      );

      updateTask.mutate({
        id: draggableId,
        task: {
          title: movedTask.title,
          description: movedTask.description,
          column: destination.droppableId as ColumnType,
        },
      });
    }
  };

  if (isLoading) {
    return <Loader message="Loading tasks..." fullScreen />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            column={column.id}
            tasks={tasksByColumn[column.id]}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};
