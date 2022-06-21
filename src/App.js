import "./App.css";

import { useEffect, useState } from "react";

import axios from "axios";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar/navBar";
import Formulario from "./components/formulario/formulario";
import Proyectos from "./components/proyectos/proyectos";
import Editar from "./components/editar/editar";

//Material Ui
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    axios.get("https://push-porfolio.herokuapp.com/portfolio").then((res) => {
      setProyectos(res.data);
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Formulario />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route
            path="/editar/:id"
            element={<Editar proyectos={proyectos} />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
