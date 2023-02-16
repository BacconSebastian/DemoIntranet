import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadoresEquipos,
  getEquipos,
  relacionarEntrenadorEquipo,
} from "../../redux/actions/actions";

import Button from "react-bootstrap/Button";

import "./RelacionesEntrenadores.css";

export default function RelacionesEntrenadores({ emailEntrenador }) {
  const dispatch = useDispatch();
  const initialInput = {
    nombre: "",
  };

  const [input, setInput] = useState(initialInput);
  const equipos = useSelector((state) => state.equipos);

  useEffect(() => {
    dispatch(getEquipos());
    dispatch(getEntrenadoresEquipos());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      relacionarEntrenadorEquipo({
        nombre: input.nombre,
        email: emailEntrenador,
      })
    );

    setInput(initialInput);
  };

  const handleSelectChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleValidateAgregar = () => {
    return input.nombre === "";
  };

  return (
    <div className="modalContainer">
      <h2 className="sub-title">Añadir equipo</h2>
      <div className="modal-body">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <select
            className="form-select"
            aria-label="Default select example"
            name="nombre"
            value={input.nombre}
            onChange={(e) => {
              handleSelectChange(e);
            }}
          >
            <option value={""} defaultValue>
              Seleccione un equipo
            </option>
            {equipos.data?.map((equipo) => {
              return (
                <>
                  <option key={equipo.nombre} value={equipo.nombre}>
                    {equipo.nombre}
                  </option>
                </>
              );
            })}
          </select>
          {!equipos.data?.length && (
            <div className="error-sin-equipos">
              <p>
                Debe crear al menos un equipo para poder dar de alta
                entrenadores
              </p>
              <a href="/crear-equipo">CREAR EQUIPO</a>
            </div>
          )}

          <div className="modal-footer">
            <Button
              variant="primary"
              className="btn btn-primary"
              type="submit"
              disabled={handleValidateAgregar()}
            >
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
