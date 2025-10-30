import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

export default function Loader({
  message = "Loading...",
  size = 40,
  fullScreen = false,
}: LoaderProps) {
  if (fullScreen) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: 2,
          bgcolor: "#f8fafc",
        }}
      >
        <CircularProgress size={size} thickness={4} />
        {message && (
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        gap: 2,
      }}
    >
      <CircularProgress size={size} thickness={4} />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}
