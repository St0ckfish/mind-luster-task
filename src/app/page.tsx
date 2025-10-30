"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import { Plus, List } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "~/components/SearchBar";
import { KanbanBoard } from "~/components/KanbanBoard";
import { TaskModal } from "~/components/TaskModal";
import { useModalStore } from "~/store/modalStore";

export default function Home() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f1f5f9", py: 4 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: "#3b82f6",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Kanban Task Board
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="/jquery-list" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<List size={20} />}
                sx={{
                  borderColor: "#64748b",
                  color: "#64748b",
                  "&:hover": {
                    borderColor: "#475569",
                    backgroundColor: "rgba(100, 116, 139, 0.04)",
                  },
                }}
              >
                jQuery List
              </Button>
            </Link>
            <Button
              variant="contained"
              size="large"
              startIcon={<Plus size={20} />}
              onClick={() => openModal("create")}
              sx={{
                backgroundColor: "#3b82f6",
                "&:hover": {
                  backgroundColor: "#2563eb",
                },
              }}
            >
              Add Task
            </Button>
          </Box>
        </Box>

        <SearchBar />

        <KanbanBoard />

        <TaskModal />
      </Container>
    </Box>
  );
}
