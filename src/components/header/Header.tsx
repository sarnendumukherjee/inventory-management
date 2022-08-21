import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Company Warehouse
        </Typography>
        <nav>
          <RouterLink to="products">
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Products
            </Link>
          </RouterLink>
          <RouterLink to="articles">
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Articles
            </Link>
          </RouterLink>
          <RouterLink to="sales">
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Sales
            </Link>
          </RouterLink>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
