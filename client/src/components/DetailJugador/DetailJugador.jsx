import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getEntrenadores, getJugadores } from "../../redux/actions/actions";

import JugadoresEquipos from "../JugadoresEquipos/JugadoresEquipos";
import RelacionesJugadores from "../RelacionesJugadores/RelacionesJugadores";
// import RelacionesJugadores from "../RelacionesJugadores/RelacionesJugadores";

import "./DetailJugador.css";

export default function DetailJugador() {
  const dispatch = useDispatch();
  const { email } = useParams();

  const [jugador, setJugador] = useState();
  const jugadores = useSelector((state) => state.jugadores);
  const hayJugadores = jugadores && jugadores.data && jugadores.data.length;

  useEffect(() => {
    dispatch(getJugadores());
  }, []);

  useEffect(() => {
    hayJugadores &&
      jugadores.data.map((e) => {
        if (e.email === email) {
          setJugador(e);
        }
      });
  }, [jugadores]);

  return (
    <div className="jugador-detail">
      <h2 className="title">{email}</h2>
      <div className="relaciones-container">
        <div className="relacion-container">
          {jugador && <JugadoresEquipos jugadorId={jugador.id} />}
        </div>
        <div
          className="relacion-container"
          style={{
            padding: "2rem",
          }}
        >
          {jugador && <RelacionesJugadores emailJugador={jugador.email} />}
        </div>
      </div>
    </div>
  );
}
