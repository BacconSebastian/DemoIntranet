import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUid } from "../../../redux/actions/actions";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { mainListItems, secondaryListItems } from "../listItems";

import ListadoEntrenadores from "../../../components/ListadoEntrenadores/ListadoEntrenadores";
import ListadoJugadores from "../../../components/ListadoJugadores/ListadoJugadores";
import ListadoEquipos from "../../../components/ListadoEquipos/ListadoEquipos";
import Spinner from "../../../components/Spinner/Spinner";
import ErrorPermisos from "../../../components/ErrorPermisos/ErrorPermisos";
import EntrenadoresEquipos from "../../../components/EntrenadoresEquipos/EntrenadoresEquipos";

import { UID_PRESIDENTE } from "../../../config";

export default function HomePresidente() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const mdTheme = createTheme();
  const drawerWidth = 240;
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const isLoading = useSelector((state) => state.isLoading);
  const uid = useSelector((state) => state.uid);

  useEffect(() => {
    dispatch(setUid(true));
  }, []);

  return (
    <div className="panel-presidente">
      {isLoading ? (
        <Spinner />
      ) : uid === UID_PRESIDENTE ? (
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: "24px",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Demo Intranet - Panel Presidente
                </Typography>
                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List>{mainListItems}</List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <ListadoEquipos />
                </Grid>
                <Grid container spacing={3}>
                  <ListadoEntrenadores />
                </Grid>
                <Grid container spacing={3}>
                  <ListadoJugadores />
                </Grid>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      ) : (
        <ErrorPermisos />
      )}
    </div>
  );
}
