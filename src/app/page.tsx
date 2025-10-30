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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 2, sm: 0 },
            mb: { xs: 3, sm: 4 },
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
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Kanban Task Board
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.5, sm: 2 },
              flexDirection: { xs: "row", sm: "row" },
              flexWrap: "nowrap",
            }}
          >
            <Link
              href="/jquery-list"
              style={{ textDecoration: "none", flex: 1 }}
            >
              <Button
                variant="outlined"
                size="medium"
                fullWidth
                startIcon={<List size={18} />}
                sx={{
                  borderColor: "#64748b",
                  color: "#64748b",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  px: { xs: 1.5, sm: 2 },
                  whiteSpace: "nowrap",
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
              size="medium"
              fullWidth
              startIcon={<Plus size={18} />}
              onClick={() => openModal("create")}
              sx={{
                backgroundColor: "#3b82f6",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                px: { xs: 1.5, sm: 2 },
                flex: 1,
                whiteSpace: "nowrap",
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
