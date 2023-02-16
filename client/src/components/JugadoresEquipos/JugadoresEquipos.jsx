import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getEquipos,
  getJugadores,
  getJugadoresEquipos,
} from "../../redux/actions/actions";

import "./JugadoresEquipos.css";

const JugadoresEquipos = ({ equipoId, jugadorId }) => {
  const dispatch = useDispatch();

  const [relacionados, setRelacionados] = useState([]);
  const jugadoresEquipos = useSelector((state) => state.jugadoresEquipos);
  const jugadores = useSelector((state) => state.jugadores);
  const equipos = useSelector((state) => state.equipos);
  const hayJugadoresEquipos =
    jugadoresEquipos && jugadoresEquipos.data && jugadoresEquipos.data.length;
  const hayJugadores = jugadores && jugadores.data && jugadores.data.length;
  const hayEquipos = equipos && equipos.data && equipos.data.length;

  const handleRowClickJugador = (e, emailJugador) => {
    e.preventDefault();
    window.location.pathname = "jugador/" + emailJugador;
  };

  const handleRowClickEquipo = () => {};

  useEffect(() => {
    dispatch(getJugadoresEquipos());
    dispatch(getJugadores());
    dispatch(getEquipos());
  }, []);

  useEffect(() => {
    hayJugadoresEquipos &&
      jugadoresEquipos.data.map((item) => {
        if (equipoId && hayJugadores) {
          const jugador = jugadores.data.find(
            (element) => element.id === equipoId
          );

          const result = {
            id: item.ID,
            emailJugador: jugador.email,
          };

          if (
            !relacionados.some(
              (relacionado) => relacionado.emailJugador === result.emailJugador
            )
          ) {
            setRelacionados([...relacionados, result]);
          }
        }

        if (jugadorId && hayEquipos) {
          const equipo = equipos.data.find(
            (element) => element.id === jugadorId
          );

          const result = {
            id: item.ID,
            nombreEquipo: equipo.nombre,
          };

          if (
            !relacionados.some(
              (relacionado) => relacionado.nombreEquipo === result.nombreEquipo
            )
          ) {
            setRelacionados([...relacionados, result]);
          }
        }
      });
  }, [jugadoresEquipos, jugadores, equipos]);

  useEffect(() => {
    let relacionadosOrdenados = relacionados;

    relacionadosOrdenados.sort((a, b) => {
      if (a.nombreEquipo < b.nombreEquipo) {
        return -1;
      }
      if (a.nombreEquipo > b.nombreEquipo) {
        return 1;
      }
      return 0;
    });

    setRelacionados(relacionadosOrdenados);
  }, [relacionados]);

  return (
    <div className="entrenadores-equipos">
      <h2 className="sub-title">{equipoId ? "Jugadores" : "Equipos"}</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              {equipoId ? "Email del jugador" : "Nombre del equipo"}
            </th>
          </tr>
        </thead>

        <tbody>
          {relacionados &&
            relacionados.map((relacionado) => {
              return equipoId ? (
                <tr
                  className="clickable"
                  key={relacionado.ID}
                  onClick={(e) =>
                    handleRowClickJugador(e, relacionado.emailJugador)
                  }
                >
                  <td className="table-data">{relacionado.emailJugador}</td>
                </tr>
              ) : (
                <tr
                  className="clickable"
                  key={relacionado.ID}
                  onClick={(e) =>
                    handleRowClickEquipo(e, relacionado.nombreEquipo)
                  }
                >
                  <td className="table-data">{relacionado.nombreEquipo}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default JugadoresEquipos;
