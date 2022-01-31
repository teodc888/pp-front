import React from "react";
import { Box,Grid, Stack } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <h1>FORMULARIO</h1>
      </Stack>

      <Box
        sx={{ width: "100%", marginTop: "50px" }}
        alignItems="center"
        justify="center"
      >
        <Grid
          spacing={{ xs: 4, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          container
        >
          <Grid item xs={4} sm={4} md={4}>
            <h1>hola</h1>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}