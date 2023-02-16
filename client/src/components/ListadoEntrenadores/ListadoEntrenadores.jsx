import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getEntrenadores } from "../../redux/actions/actions";

import agregarIcon from "../../images/agregar-icon.svg";

import "./ListadoEntrenadores.css";

const ListadoEntrenadores = () => {
  const dispatch = useDispatch();

  const entrenadores = useSelector((state) => state.entrenadores);
  const hayEntrenadores =
    entrenadores && entrenadores.data && entrenadores.data.length > 0;

  const handleRowClick = (e, entrenador) => {
    e.preventDefault();
    window.location.pathname = "entrenador/" + entrenador.email;
  };

  useEffect(() => {
    dispatch(getEntrenadores());
  }, []);

  return (
    <div className="listado-entrenadores">
      <h2 className="sub-title">Lista de entrenadores activos</h2>
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
          {!hayEntrenadores && (
            <tr>
              <td className="table-data example-text">Juan Pérez</td>
              <td className="table-data example-text">juanperez@example.com</td>
            </tr>
          )}
          {hayEntrenadores
            ? entrenadores.data.map((entrenador) => {
                return (
                  <tr
                    key={entrenador.email}
                    className="clickable"
                    onClick={(e) => handleRowClick(e, entrenador)}
                  >
                    <td className="table-data">{entrenador.nombre}</td>
                    <td className="table-data">{entrenador.email}</td>
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
                href="/crear-entrenador"
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

export default ListadoEntrenadores;
