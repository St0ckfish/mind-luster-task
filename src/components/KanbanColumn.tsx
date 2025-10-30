import { useState, useMemo } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import type { Task, ColumnType } from "~/types/task";
import { TaskCard } from "./TaskCard";
import { useModalStore } from "~/store/modalStore";
import { useSearchStore } from "~/store/searchStore";

interface KanbanColumnProps {
  title: string;
  column: ColumnType;
  tasks: Task[];
}

const ITEMS_PER_PAGE = 10;

export const KanbanColumn = ({ title, column, tasks }: KanbanColumnProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const [page, setPage] = useState(1);

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;

    const query = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query),
    );
  }, [tasks, searchQuery]);

  const paginatedTasks = useMemo(() => {
    const startIndex = 0;
    const endIndex = page * ITEMS_PER_PAGE;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, page]);

  const hasMore = paginatedTasks.length < filteredTasks.length;

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const getColumnColor = (col: ColumnType) => {
    switch (col) {
      case "backlog":
        return "#64748b";
      case "in-progress":
        return "#3b82f6";
      case "review":
        return "#f59e0b";
      case "done":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: "#f8fafc",
        borderRadius: 2,
        p: 2,
        height: "700px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          pb: 2,
          borderBottom: `3px solid ${getColumnColor(column)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: getColumnColor(column) }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              backgroundColor: getColumnColor(column),
              color: "white",
              borderRadius: "50%",
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {filteredTasks.length}
          </Box>
        </Box>
        <Button
          size="small"
          startIcon={<Plus size={16} />}
          onClick={() => openModal("create", undefined, column)}
          sx={{
            minWidth: "auto",
            color: getColumnColor(column),
            "&:hover": {
              backgroundColor: `${getColumnColor(column)}15`,
            },
          }}
        >
          Add
        </Button>
      </Box>

      <Droppable droppableId={column}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flex: 1,
              overflowY: "auto",
              backgroundColor: snapshot.isDraggingOver
                ? "#e0f2fe"
                : "transparent",
              borderRadius: 1,
              transition: "background-color 0.2s ease",
              p: 1,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f5f9",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#94a3b8",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#64748b",
              },
            }}
          >
            {paginatedTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}

            {paginatedTasks.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                  color: "text.secondary",
                }}
              >
                <Typography variant="body2">
                  {searchQuery ? "No tasks found" : "No tasks yet"}
                </Typography>
              </Box>
            )}

            {hasMore && (
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={handleLoadMore}
                sx={{ mt: 2 }}
              >
                Load More
              </Button>
            )}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};
