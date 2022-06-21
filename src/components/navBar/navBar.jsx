import * as React from "react";

import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  const handleFormulario = () =>{

    navigate("/");

  }

  const handleProyectos = () =>{

    navigate("/proyectos");

  }
  
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor: "#263238" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PORTFOLIO
          </Typography>
          <Button color="inherit" onClick={handleFormulario}>formulario</Button>
          <Button color="inherit" onClick={handleProyectos}>Proyectos</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
