import React, { useState } from "react";

import axios from "axios";

import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Input,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";

import Swal from "sweetalert2";

import { useParams, useNavigate } from "react-router";

export default function Editar({ proyectos }) {
  const navigate = useNavigate();

  const { id } = useParams();

  //Obtener el proyecto
  const filtrado = proyectos.find((proyecto) => proyecto.id === id);

  const [input, setInput] = useState(filtrado);

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
    await axios.put(`https://push-porfolio.herokuapp.com/portfolio`, input);
    Swal.fire({
      text: "Se edito con exito",
      confirmButtonText: "Ok",
      icon: "success",
      width: "auto",
      timer: 2500,
    });
    navigate("/");
  };

  console.log(input);
  return (
    <Box sx={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" component={"div"} gutterBottom>
          {" "}
          Editar
        </Typography>
        <Box>
          <Grid
            container
            spacing={{ xs: 4, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 16, lg: 16 }}
          >
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <CardMedia
                component="img"
                height="400"
                image={input ? input.imagen : null}
                alt="green iguana"
                sx={{ objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={16} lg={16}>
              <Input type="file" name="imagen" onChange={handleFiles} />
            </Grid>
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
            <Grid item xs={4} sm={8} md={16} lg={16} sx={{ mb: "1%" }}>
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  width: { xs: "100%", sm: "100%", md: "20%", lg: "20%" },
                  mb: "1%",
                }}
              >
                Editar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}
