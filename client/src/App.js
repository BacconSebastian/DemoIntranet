import React from "react";
import { Routes, Route } from "react-router-dom";

import { REGISTER_ENTRENADOR, REGISTER_JUGADOR } from "./config";

import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import RegisterJugador from "./components/RegisterJugador/RegisterJugador";
import RegisterEntrenador from "./components/RegisterEntrenador/RegisterEntrenador";
import CreateEntrenador from "./components/CreateEntrenador/CreateEntrenador";
import CreateJugador from "./components/CreateJugador/CreateJugador";
import CreateEquipo from "./components/CreateEquipo/CreateEquipo";

import "./App.css";
import DetailEquipo from "./components/DetailEquipo/DetailEquipo";
import DetailEntrenador from "./components/DetailEntrenador/DetailEntrenador";
import DetailJugador from "./components/DetailJugador/DetailJugador";
import ComingSoon from "./components/ComingSoon/ComingSoon";

const App = () => {
  return (
    <div className="app">
      <Routes>
        {/* RUTAS GENERALES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/" + REGISTER_JUGADOR} element={<RegisterJugador />} />
        <Route
          path={"/" + REGISTER_ENTRENADOR}
          element={<RegisterEntrenador />}
        />

        {/* RUTAS DE CREACION */}
        <Route path="crear-entrenador" element={<CreateEntrenador />} />
        <Route path="crear-jugador" element={<CreateJugador />} />
        <Route path="crear-equipo" element={<CreateEquipo />} />

        {/* RUTAS DE DETALLES */}
        <Route path="equipo/:nombre" element={<DetailEquipo />} />
        <Route path="entrenador/:email" element={<DetailEntrenador />} />
        <Route path="jugador/:email" element={<DetailJugador />} />

        {/* RUTAS ENTRENADORES */}
        <Route path="/perfil-entrenador" element={<ComingSoon />} />
        <Route path="/crear-novedad-entrenador" element={<ComingSoon />} />

        {/* RUTAS JUGADORES */}
        <Route path="/chat-equipo" element={<ComingSoon />} />
        <Route path="/novedades-jugador" element={<ComingSoon />} />
      </Routes>
    </div>
  );
};

export default App;
