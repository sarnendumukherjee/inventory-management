import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./mui-theme";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import AppRoutes from "./Routes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <SnackbarProvider maxSnack={3}>
          <Header />
          <AppRoutes />
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
