import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadores,
  getEntrenadoresEquipos,
  getEquipos,
} from "../../redux/actions/actions";

import "./EntrenadoresEquipos.css";

const EntrenadoresEquipos = ({ equipoId, entrenadorId }) => {
  console.log("IDS EQ/EN: ", equipoId, entrenadorId);
  const dispatch = useDispatch();

  const [relacionados, setRelacionados] = useState([]);
  const entrenadoresEquipos = useSelector((state) => state.entrenadoresEquipos);
  const entrenadores = useSelector((state) => state.entrenadores);
  const equipos = useSelector((state) => state.equipos);
  const hayEntrenadoresEquipos =
    entrenadoresEquipos &&
    entrenadoresEquipos.data &&
    entrenadoresEquipos.data.length;
  const hayEntrenadores =
    entrenadores && entrenadores.data && entrenadores.data.length;
  const hayEquipos = equipos && equipos.data && equipos.data.length;

  const handleRowClickEquipo = (e, nombreEquipo) => {
    e.preventDefault();
    window.location.pathname = "equipo/" + nombreEquipo;
  };

  const handleRowClickEntrenador = (e, emailEntrenador) => {
    e.preventDefault();
    window.location.pathname = "entrenador/" + emailEntrenador;
  };

  useEffect(() => {
    dispatch(getEntrenadoresEquipos());
    dispatch(getEntrenadores());
    dispatch(getEquipos());
  }, []);

  useEffect(() => {
    hayEntrenadoresEquipos &&
      entrenadoresEquipos.data.map((item) => {
        if (equipoId && hayEntrenadores) {
          const entrenador = entrenadores.data.find(
            (element) => element.id === equipoId
          );

          const result = {
            id: item.ID,
            emailEntrenador: entrenador.email,
          };

          if (
            !relacionados.some(
              (relacionado) =>
                relacionado.emailEntrenador === result.emailEntrenador
            )
          ) {
            setRelacionados([...relacionados, result]);
          }
        }

        if (entrenadorId && hayEquipos) {
          const equipo = equipos.data.find(
            (element) => element.id === entrenadorId
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
  }, [entrenadoresEquipos, entrenadores, equipos]);

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
      <h2 className="sub-title">{equipoId ? "Entrenadores" : "Equipos"}</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              {equipoId ? "Email del entrenador" : "Nombre del equipo"}
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
                    handleRowClickEntrenador(e, relacionado.emailEntrenador)
                  }
                >
                  <td className="table-data">{relacionado.emailEntrenador}</td>
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

export default EntrenadoresEquipos;
