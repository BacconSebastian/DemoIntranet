import React, { useState } from "react";

import Link from "@mui/material/Link";

import { useDispatch, useSelector } from "react-redux";
import {
  createEquipo,
  getEquipos,
  setLoading,
} from "../../../redux/actions/actions";

import Spinner from "../../../components/Spinner/Spinner";

import "./CreateEquipoPanel.css";

const CreateEquipoPanel = () => {
  const dispatch = useDispatch();

  const initialInput = {
    nombre: "",
    ciudad: "",
  };
  const [input, setInput] = useState(initialInput);
  const [equiposAgregados, setEquiposAgregados] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    setEquiposAgregados([...equiposAgregados, input]);
    setInput(initialInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    equiposAgregados.map((quipo) => {
      try {
        dispatch(createEquipo(quipo));
      } catch (error) {
        console.log("ERROR: ", error);
      }
      dispatch(getEquipos());
    });

    dispatch(setLoading(false));
    setEquiposAgregados([]);
  };

  const handleValidateAgregar = () => {
    if (!validateRepeat() && input.ciudad.length > 3) {
      return false;
    } else {
      return true;
    }
  };

  const handleValidateAceptar = () => {
    return equiposAgregados.length < 1;
  };

  const validateRepeat = () => {
    for (let i = 0; i < equiposAgregados.length; i++) {
      if (equiposAgregados[i].email === input.email) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="create-equipo">
      <h2 className="sub-title">Dar de alta equipos</h2>

      {isLoading && <Spinner />}

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Nombre del equipo
          </span>

          <input
            name="nombre"
            value={input.nombre}
            placeholder="FC Example"
            type="text"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Nombre"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Ciudad del equipo
          </span>

          <input
            name="ciudad"
            value={input.ciudad}
            placeholder="Example City"
            type="text"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Ciudad"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-primary me-md-2"
            type="button"
            onClick={(e) => {
              handleAgregar(e);
            }}
            disabled={handleValidateAgregar()}
          >
            Agregar
          </button>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={handleValidateAceptar()}
          >
            Aceptar
          </button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              Nombre
            </th>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              Ciudad
            </th>
          </tr>
        </thead>

        <tbody>
          {!equiposAgregados.length && (
            <tr>
              <td
                className="example-text"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                FC Example
              </td>
              <td
                className="example-text"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                Example City
              </td>
            </tr>
          )}
          {equiposAgregados.length
            ? equiposAgregados.map((equipo) => {
              return (
                <tr key={equipo.nombre}>
                  <td className="table-data">{equipo.nombre}</td>
                  <td className="table-data">{equipo.ciudad}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </table>
      <Link href="/home-presidente">
        <button className="botonVolverLogin">Volver</button>
      </Link>
    </div>
  );
};

export default CreateEquipoPanel;
