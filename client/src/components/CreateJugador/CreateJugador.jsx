import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  createJugador,
  setLoading,
  getEquipos,
} from "../../redux/actions/actions";

import emailjs from "@emailjs/browser";

import Spinner from "../Spinner/Spinner";

import "./CreateJugador.css";

import ModalAddEquipo from "../CreateEntrenador/ModalAddEquipo";
import ModalVerJugador from "./ModalVerJugador";

const CreateJugador = () => {
  const dispatch = useDispatch();

  const initialInput = {
    nombre: "",
    email: "",
    equiposAgregados: [],
    // nombreEquipo: "Real Madrid",
  };
  const [input, setInput] = useState(initialInput);
  const [jugadoresAgregados, setJugadoresAgregados] = useState([]);
  const [equiposAgregados, setEquiposAgregados] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    setJugadoresAgregados([...jugadoresAgregados, input]);
    setInput(initialInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    jugadoresAgregados.map((jugador) => {
      dispatch(createJugador(jugador));
    });

    emailjs.init("A_EZ040hD2lkySGIj");

    jugadoresAgregados.map((jugador) => {
      emailjs.send("service_0kg3rpc", "template_0vvf34c", {
        from_name: "CallStack IT",
        to_name: jugador.nombre,
        to_email: jugador.email,
      });
    });

    dispatch(setLoading(false));
    setJugadoresAgregados([]);
  };

  const handleValidateAgregar = () => {
    let regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      !validateRepeat() &&
      regexEmail.test(input.email) &&
      input.nombre.length > 2
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleValidateAceptar = () => {
    return jugadoresAgregados.length < 1;
  };

  const validateRepeat = () => {
    for (let i = 0; i < jugadoresAgregados.length; i++) {
      if (jugadoresAgregados[i].email === input.email) {
        return true;
      }
    }
    return false;
  };

  const handleRowClick = (e) => {
    e.preventDefault();
    <ModalAddEquipo />;
    console.log("meclickeaste");
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getEquipos());
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
  }, []);

  useEffect(() => {
    setInput({ ...input, equiposAgregados });
  }, [equiposAgregados]);

  useEffect(() => {
    console.log("jugadoresAgregados", jugadoresAgregados);
  }, [jugadoresAgregados]);

  return (
    <div className="create-jugador">
      <h2 className="sub-title">Dar de alta jugadores</h2>

      {isLoading && <Spinner />}

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Nombre del jugador
          </span>

          <input
            name="nombre"
            value={input.nombre}
            placeholder="Juan Pérez"
            type="text"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Email del jugador
          </span>

          <input
            name="email"
            value={input.email}
            placeholder="juanperez@example.com"
            type="text"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Email"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Equipo
          </span>
          <ModalAddEquipo
            equiposAgregados={equiposAgregados}
            setEquiposAgregados={setEquiposAgregados}
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
            <th style={{ width: "45%", textAlign: "center" }} scope="col">
              Nombre
            </th>
            <th style={{ width: "45%", textAlign: "center" }} scope="col">
              Email
            </th>
          </tr>
        </thead>

        <tbody>
          {!jugadoresAgregados.length && (
            <tr>
              <td
                className="example-text"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                Juan Pérez
              </td>
              <td
                className="example-text"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                juanperez@example.com
              </td>
            </tr>
          )}
          {jugadoresAgregados.length
            ? jugadoresAgregados.map((jugador) => {
                return (
                  <tr key={jugador.email}>
                    <td className="table-data" style={{ paddingTop: 15 }}>
                      {jugador.nombre}
                    </td>
                    <td className="table-data" style={{ paddingTop: 15 }}>
                      {jugador.email}
                    </td>
                    <td className="table-data">
                      <ModalVerJugador
                        jugadoresAgregados={jugadoresAgregados}
                        setJugadoresAgregados={setJugadoresAgregados}
                      />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default CreateJugador;
