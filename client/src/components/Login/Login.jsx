import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/actions";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import pelota from "../../images/pelota.jpg";
import "./Login.css";

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

export default function Login() {
  const dispatch = useDispatch();
  const theme = createTheme();
  const initialValues = {
    email: "",
    password: "",
  };

  const [input, setInput] = useState(initialValues);
  const error = useSelector((state) => state.error);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(input));
    setTimeout(() => {
      if (!error) {
        window.location.pathname = "/";
      }
    }, 1500);
  };

  useEffect(() => {
    console.log("ERROR :", error);
  }, [error]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${pelota})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1 }}>
                <img src={pelota} alt="Imagen de avatar" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Demo Intranet
              </Typography>
              <Box
                component="form"
                sx={{ mt: 1 }}
                onSubmit={(e) => handleLogin(e)}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="pass"
                  onChange={(e) => handleInputChange(e)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Mantener sesión iniciada"
                />
                {error !== "" && (
                  <p className="input-error">Error al iniciar sesión</p>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesion
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      href="/register"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="btnLogIn">{"Registrarse"}</div>
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Link href="/">
        <button className="botonVolverLogin">Volver</button>
      </Link>
    </div>
  );
}
