import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Input,
  TextField,
  TextareaAutosize,
  Button,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";

export default function Formulario() {
  const [input, setInput] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    link: "",
    github: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFiles = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "d3bholnc ");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dellacqua-shops/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setInput({ ...input, imagen: file.secure_url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`https://push-porfolio.herokuapp.com/portfolio`, input);
    setInput({
      titulo: "",
      descripcion: "",
      imagen: "",
      link: "",
      github: "",
    });
    Swal.fire({
      text: "se cargo el proyecto con exito",
      confirmButtonText: "Ok",
      icon: "success",
      width: "auto",
      timer: 2500,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: "100%",
            marginTop: "50px",
            textAlign: "center",
            bgcolor: "#263238",
            height: "100%",
            borderRadius: "20px",
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ mb: "2%" }}
          >
            Cargar Formulario
          </Typography>
          <Grid
            container
            spacing={{ xs: 3, md: 7 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <TextField
                id="titulo"
                label="TITULO"
                variant="outlined"
                name="titulo"
                value={input.titulo}
                required
                onChange={handleInput}
                sx={{ width: { xs: "100%", sm: "100%", md: "40%", lg: "40%" } }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              md={16}
              lg={16}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{ width: { xs: "100%", sm: "100%", md: "40%", lg: "40%" } }}
              >
                <TextareaAutosize
                  aria-label="descripcion"
                  minRows={3}
                  placeholder="DESCRIPCION *"
                  style={{ width: "100%", height: 150 }}
                  name="descripcion"
                  value={input.descripcion}
                  required
                  onChange={handleInput}
                />
              </Box>
            </Grid>
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <Input
                type="file"
                name="imagen"
                onChange={handleFiles}
                required
              />
            </Grid>
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <TextField
                id="LINK"
                label="LINK"
                variant="outlined"
                name="link"
                value={input.link}
                required
                onChange={handleInput}
                sx={{ width: { xs: "100%", sm: "100%", md: "40%", lg: "40%" } }}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <TextField
                id="GITHUB"
                label="GITHUB"
                variant="outlined"
                name="github"
                value={input.github}
                required
                onChange={handleInput}
                sx={{ width: { xs: "100%", sm: "100%", md: "40%", lg: "40%" } }}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{
                  width: { xs: "100%", sm: "100%", md: "20%", lg: "20%" },
                  mb:"1%"
                }}
              >
                ENVIAR
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}
