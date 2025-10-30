import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";
import { useSearchStore } from "~/store/searchStore";

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        placeholder="Search by task title or description"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: 2,
          },
        }}
      />
    </Box>
  );
};
