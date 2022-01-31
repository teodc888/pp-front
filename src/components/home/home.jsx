import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Input,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";

export default function Home() {
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
    data.append("upload_preset", "Product_photo ");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djtkn6o7r/image/upload",
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

  };

  return (
    <div>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <h1>FORMULARIO XD</h1>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ width: "100%", marginTop: "50px" }}
          alignItems="center"
          justify="center"
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16} sx={{ marginBottom: "2%" }}>
              <TextField
                id="titulo"
                label="TITULO"
                variant="outlined"
                name="titulo"
                value={input.titulo}
                required
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={16} sx={{ marginBottom: "2%" }}>
              <TextareaAutosize
                aria-label="descripcion"
                minRows={3}
                placeholder="DESCRIPCION *"
                style={{ width: 300, height: 100 }}
                name="descripcion"
                value={input.descripcion}
                required
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={16} sx={{ marginBottom: "2%" }}>
              <Input type="file" name="imagen" onChange={handleFiles}   required />
            </Grid>
            <Grid item xs={16} sx={{ marginBottom: "2%" }}>
              <TextField
                id="LINK"
                label="LINK"
                variant="outlined"
                name="link"
                value={input.link}
                required
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={16} sx={{ marginBottom: "2%" }}>
              <TextField
                id="GITHUB"
                label="GITHUB"
                variant="outlined"
                name="github"
                value={input.github}
                required
                onChange={handleInput}
              />
            </Grid>
          </Grid>
        </Box>
        <button> ENVIAR </button>
      </form>
    </div>
  );
}
