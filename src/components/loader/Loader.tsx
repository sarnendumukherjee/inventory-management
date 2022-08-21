import { Box, CircularProgress } from "@mui/material";

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      height: "90vh",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);
export default Loader;
