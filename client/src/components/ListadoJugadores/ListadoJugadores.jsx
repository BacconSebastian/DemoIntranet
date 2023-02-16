import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getJugadores } from "../../redux/actions/actions";

import agregarIcon from "../../images/agregar-icon.svg";

import "./ListadoJugadores.css";

const ListadoJugadores = () => {
  const dispatch = useDispatch();

  const jugadores = useSelector((state) => state.jugadores);
  const hayJugadores = jugadores && jugadores.data && jugadores.data.length;

  const handleRowClick = (e, jugador) => {
    e.preventDefault();
    window.location.pathname = "jugador/" + jugador.email;
  };

  useEffect(() => {
    dispatch(getJugadores());
  }, []);

  return (
    <div className="listado-jugadores">
      <h2 className="sub-title">Lista de jugadores activos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              Nombre
            </th>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              Email
            </th>
          </tr>
        </thead>

        <tbody>
          {!hayJugadores && (
            <tr>
              <td className="table-data example-text">Juan Pérez</td>
              <td className="table-data example-text">juanperez@example.com</td>
            </tr>
          )}
          {hayJugadores
            ? jugadores.data.map((jugador) => {
                return (
                  <tr
                    key={jugador.email}
                    className="clickable"
                    onClick={(e) => handleRowClick(e, jugador)}
                  >
                    <td className="table-data">{jugador.nombre}</td>
                    <td className="table-data">{jugador.email}</td>
                  </tr>
                );
              })
            : null}
          <tr>
            <td
              className="example-text"
              style={{
                textAlign: "center",
                fontSize: "12px",
                borderRight: "0",
              }}
            ></td>
            <td
              className="example-text"
              style={{ textAlign: "center", fontSize: "12px", borderLeft: "0" }}
            >
              <a
                className="button-agregar"
                href="/crear-jugador"
                target={"_blank"}
              >
                <img className="agregar-icon" src={agregarIcon} />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListadoJugadores;
