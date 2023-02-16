import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getEntrenadores } from "../../redux/actions/actions";

import EntrenadoresEquipos from "../EntrenadoresEquipos/EntrenadoresEquipos";
import RelacionesEntrenadores from "../RelacionesEntrenadores/RelacionesEntrenadores";

import "./DetailEntrenador.css";

export default function DetailEntrenador() {
  const dispatch = useDispatch();
  const { email } = useParams();

  const [entrenador, setEntrenador] = useState();
  const entrenadores = useSelector((state) => state.entrenadores);
  const hayEntrenadores =
    entrenadores && entrenadores.data && entrenadores.data.length;

  useEffect(() => {
    dispatch(getEntrenadores());
  }, []);

  useEffect(() => {
    hayEntrenadores &&
      entrenadores.data.map((e) => {
        if (e.email === email) {
          setEntrenador(e);
        }
      });
  }, [entrenadores]);

  return (
    <div className="entrenador-detail">
      <h2 className="title">{email}</h2>
      <div className="relaciones-container">
        <div className="relacion-container">
          {entrenador && <EntrenadoresEquipos entrenadorId={entrenador.id} />}
        </div>
        <div
          className="relacion-container"
          style={{
            padding: "2rem",
          }}
        >
          {entrenador && (
            <RelacionesEntrenadores emailEntrenador={entrenador.email} />
          )}
        </div>
      </div>
    </div>
  );
}
