import * as React from "react";

import axios from "axios";

import {
  Link,
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";

import Swal from "sweetalert2";

import { useNavigate } from "react-router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardP({
  imagen,
  titulo,
  descripcion,
  github,
  link,
  id,
  setProyectos,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://push-porfolio.herokuapp.com/portfolio`, {
        data: { id: id },
      });
      setOpen(false);
      Swal.fire({
        text: "se elimino con exito",
        confirmButtonText: "Ok",
        icon: "success",
        width: "auto",
        timer: 2500,
      });
      setTimeout(() => {
        axios
          .get("https://push-porfolio.herokuapp.com/portfolio")
          .then((res) => {
            setProyectos(res.data);
          });
      }, 500);
    } catch (error) {
      Swal.fire({
        text: "no se pudo eliminar",
        confirmButtonText: "Ok",
        icon: "error",
        width: "auto",
        timer: 2500,
      });
    }
  };

  const handleEditar = () => {
    navigate(`/editar/${id}`);
    setOpen(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 450,
        margin: "auto",
        mb: "5%",
      }}
    >
      <Button
        variant="contained"
        color="warning"
        sx={{ position: "absolute" }}
        onClick={handleClickOpen}
      >
        Editar
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Que quieres hacer?"}</DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ mr: "10%" }}
            onClick={handleEditar}
          >
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogContent>
      </Dialog>
      <CardMedia
        component="img"
        height="255"
        image={imagen}
        alt="green iguana"
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={github}>
          <Button
            size="small"
            sx={{
              color: "white",
              background:
                "linear-gradient(45deg, #263238, #263238, #263238, #263238, #263238, #263238)",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px #263238",
              transition: "all 0.3s ease-in-out",
              ":hover": { transform: "scale(1.1)" },
            }}
          >
            GitHub
          </Button>
        </Link>
        <Link href={link}>
          <Button
            size="small"
            sx={{
              color: "white",
              background:
                "linear-gradient(45deg, #263238, #263238, #263238, #263238, #263238, #263238)",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px #263238",
              transition: "all 0.3s ease-in-out",
              ":hover": { transform: "scale(1.1)" },
            }}
          >
            Ver
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
