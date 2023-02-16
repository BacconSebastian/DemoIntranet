import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getEquipos } from "../../redux/actions/actions";

import agregarIcon from "../../images/agregar-icon.svg";

import "./ListadoEquipos.css";

const ListadoEquipos = () => {
  const dispatch = useDispatch();

  const equipos = useSelector((state) => state.equipos);
  const hayEquipos = equipos && equipos.data && equipos.data.length;

  const handleRowClick = (e, equipo) => {
    e.preventDefault();
    window.location.pathname = "equipo/" + equipo.nombre;
  };

  useEffect(() => {
    dispatch(getEquipos());
  }, []);

  return (
    <div className="listado-equipos">
      <h2 className="sub-title">Lista de equipos activos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: "40%", textAlign: "center" }} scope="col">
              Nombre
            </th>
            <th style={{ width: "40%", textAlign: "center" }} scope="col">
              Ciudad
            </th>
          </tr>
        </thead>

        <tbody>
          {hayEquipos ? (
            equipos.data.map((equipo) => {
              return (
                <tr
                  className="clickable"
                  key={equipo.nombre}
                  onClick={(e) => handleRowClick(e, equipo)}
                >
                  <td className="table-data">{equipo.nombre}</td>
                  <td className="table-data">{equipo.ciudad}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="table-data example-text">FC Example</td>
              <td className="table-data example-text">Example City</td>
            </tr>
          )}
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
                href="/crear-equipo"
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

export default ListadoEquipos;
