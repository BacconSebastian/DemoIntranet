import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJugadores, registerJugador } from "../../redux/actions/actions";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Demo Intranet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Register() {
  const dispatch = useDispatch();
  const theme = createTheme();
  const initialValues = {
    name: "",
    email: "",
    cemail: "",
    password: "",
    cpassword: "",
  };

  const [input, setInput] = useState(initialValues);
  const [jugadorInexistente, setJugadorInexistente] = useState("");
  const error = useSelector((state) => state.error);
  const uids = useSelector((state) => state.uids);
  const jugadores = useSelector((state) => state.jugadores);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let flag = false;

    if (jugadores && jugadores.data) {
      jugadores.data.map((jugador) => {
        if (String(jugador.email) === String(input.email)) {
          flag = true;
          dispatch(registerJugador(input));

          if (!error) {
            setTimeout(() => {
              window.location.pathname = "/";
            }, 1500);
          }
        }
      });
    }

    if (!flag) {
      setJugadorInexistente("Este email no esta habilitado para ser jugador.");
    }
  };

  const registerVerify = () => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const verify =
      input.name.length > 2 &&
      emailRegex.test(input.email) &&
      input.email === input.cemail &&
      passwordRegex.test(input.password) &&
      input.password === input.cpassword;

    return !verify;
  };

  useEffect(() => {
    console.log("ERROR: ", error);
    console.log("ENTRENADORES: ", jugadores);
  }, [error, jugadores]);

  useEffect(() => {
    dispatch(getJugadores());
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrarse como jugador
            </Typography>
            <Box
              component="form"
              sx={{ mt: 3 }}
              onSubmit={(e) => handleRegister(e)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nombre completo"
                    autoFocus
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="cemail"
                    label="Confirmar email"
                    name="cemail"
                    autoComplete="email"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirmar contraseña"
                    type="password"
                    id="cpassword"
                    autoComplete="new-password"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={registerVerify()}
              >
                Registrarme
              </Button>
              {jugadorInexistente && (
                <p className="input-error" style={{ marginBottom: "1rem" }}>
                  {jugadorInexistente}
                </p>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="btnRegister">Volver a inicio de sesión</div>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
