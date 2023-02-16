import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getEntrenadores,
  getJugadores,
  relacionarJugadorEquipo,
  relacionarEntrenadorEquipo,
  getEntrenadoresEquipos,
  getJugadoresEquipos,
} from "../../redux/actions/actions";

import "./RelacionesEquipos.css";

export default function RelacionesEquipos({ nombreEquipo }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const initialJugador = {
    emailJugador: "",
  };
  const initialEntrenador = {
    emailEntrenador: "",
  };

  const [inputJugador, setInputJugador] = useState(initialJugador);
  const [inputEntrenador, setInputEntrenador] = useState(initialEntrenador);
  const [jugadoresRelacionados, setJugadoresRelacionados] = useState([]);
  const [entrenadoresRelacionados, setEntrenadoresRelacionados] = useState([]);
  const jugadoresEquipos = useSelector((state) => state.jugadoresEquipos);
  const entrenadoresEquipos = useSelector((state) => state.entrenadoresEquipos);
  const entrenadores = useSelector((state) => state.entrenadores);
  const jugadores = useSelector((state) => state.jugadores);
  const equipos = useSelector((state) => state.equipos);
  const hayEquipos = equipos && equipos.data && equipos.data.length;
  const hayJugadores = jugadores && jugadores.data && jugadores.data.length;
  const hayEntrenadores =
    entrenadores && entrenadores.data && entrenadores.data.length;
  const hayEntrenadoresEquipos =
    entrenadoresEquipos &&
    entrenadoresEquipos.data &&
    entrenadoresEquipos.data.length;

  useEffect(() => {
    dispatch(getJugadores());
    dispatch(getEntrenadores());
    dispatch(getJugadoresEquipos());
    dispatch(getEntrenadoresEquipos());
  }, []);

  const handleSelectJugador = (e) => {
    setInputJugador({ ...inputJugador, [e.target.name]: e.target.value });
  };

  const handleSelectEntrenador = (e) => {
    setInputEntrenador({ ...inputEntrenador, [e.target.name]: e.target.value });
  };

  const handleSubmitJugador = (e) => {
    e.preventDefault();
    dispatch(
      relacionarJugadorEquipo({
        nombre: nombreEquipo,
        email: inputJugador.emailJugador,
      })
    );
    setInputJugador(initialJugador);
    dispatch(getJugadores());
  };

  const handleSubmitEntrenador = (e) => {
    e.preventDefault();
    dispatch(
      relacionarEntrenadorEquipo({
        nombre: nombreEquipo,
        email: inputEntrenador.emailEntrenador,
      })
    );
    setInputEntrenador(initialEntrenador);
  };

  const handleValidateJugador = () => {
    return inputJugador.emailJugador === "";
  };

  const handleValidateEntrenador = () => {
    return inputEntrenador.emailEntrenador === "";
  };

  const getJugadoresRelacionados = () => {
    if (
      hayEquipos &&
      hayEntrenadoresEquipos &&
      hayEntrenadores &&
      hayJugadores
    ) {
      const equipo = equipos.data.find(
        (element) => element.nombre === nombreEquipo
      );
      jugadoresEquipos.data.map((jugadorRelacionado) => {
        if (equipo.id === jugadorRelacionado.equipoId) {
          const jugador = jugadores.data.find(
            (element) => element.id === jugadorRelacionado.jugadorid
          );
          if (
            !jugadoresRelacionados.some(
              (relacionado) => relacionado.id === jugador.id
            )
          ) {
            setJugadoresRelacionados([...jugadoresRelacionados, jugador]);
          }
        }
      });
    }
  };

  const getEntrenadoresRelacionados = () => {
    if (
      hayEquipos &&
      hayEntrenadores &&
      hayEntrenadoresEquipos &&
      hayEntrenadores
    ) {
      const equipo = equipos.data.find(
        (element) => element.nombre === nombreEquipo
      );
      entrenadoresEquipos.data.map((entrenadorRelacionado) => {
        if (equipo.id === entrenadorRelacionado.equipoId) {
          const entrenador = entrenadores.data.find(
            (element) => element.id === entrenadorRelacionado.entrenadorid
          );
          if (
            !entrenadoresRelacionados.some(
              (relacionado) => relacionado.id === entrenador.id
            )
          ) {
            setEntrenadoresRelacionados([
              ...entrenadoresRelacionados,
              entrenador,
            ]);
          }
        }
      });
    }
  };

  useEffect(() => {
    getJugadoresRelacionados();
  }, [jugadoresEquipos]);

  useEffect(() => {
    getEntrenadoresRelacionados();
  }, [entrenadoresEquipos]);

  return (
    <div className="modalContainer">
      <div className="subModalContainer">
        <h2 className="sub-title">Añadir entrenador</h2>
        <div className="modal-body">
          <form onSubmit={(e) => handleSubmitEntrenador(e)}>
            <select
              className="form-select"
              aria-label="Default select example"
              name="emailEntrenador"
              value={inputEntrenador.emailEntrenador}
              onChange={(e) => {
                handleSelectEntrenador(e);
              }}
            >
              <option value={""} selected>
                Seleccione un entrenador
              </option>
              {entrenadores.data?.map((entrenador) => {
                return (
                  <>
                    {!entrenadoresRelacionados.some(
                      (relacionado) => relacionado.id === entrenador.id
                    ) ? (
                      <option key={entrenador.email} value={entrenador.email}>
                        {entrenador.email}
                      </option>
                    ) : (
                      <option
                        key={entrenador.email}
                        value={entrenador.email}
                        disabled
                      >
                        {entrenador.email} (relacionado)
                      </option>
                    )}
                  </>
                );
              })}
            </select>
            <div className="modal-footer">
              <Button
                variant="primary"
                className="btn btn-primary"
                type="submit"
                disabled={handleValidateEntrenador()}
              >
                Agregar
              </Button>
            </div>
          </form>
          {/* <table className="table table-bordered tableContainer">
                <thead>
                  <tr>
                    <th
                      style={{ width: "40%", textAlign: "center" }}
                      scope="col"
                    >
                      Relacionados
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entrenadoresRelacionados &&
                    entrenadoresRelacionados.map((relacionado) => {
                      return (
                        <tr>
                          <td className="table-data example-text">
                            {relacionado.email}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table> */}
        </div>
      </div>
      <div className="subModalContainer">
        <h2 className="sub-title">Añadir jugador</h2>
        <div className="modal-body">
          <form onSubmit={(e) => handleSubmitJugador(e)}>
            <select
              className="form-select"
              aria-label="Default select example"
              name="emailJugador"
              value={inputJugador.emailJugador}
              onChange={(e) => {
                handleSelectJugador(e);
              }}
            >
              <option value={""} selected>
                Seleccione un jugador
              </option>
              {jugadores.data?.map((jugador) => {
                return (
                  <>
                    {!jugadoresRelacionados.some(
                      (relacionado) => relacionado.id === jugador.id
                    ) ? (
                      <option key={jugador.email} value={jugador.email}>
                        {jugador.email}
                      </option>
                    ) : (
                      <option
                        key={jugador.email}
                        value={jugador.email}
                        disabled
                      >
                        {jugador.email} (relacionado)
                      </option>
                    )}
                  </>
                );
              })}
            </select>
            <div className="modal-footer">
              <Button
                variant="primary"
                className="btn btn-primary"
                type="submit"
                disabled={handleValidateJugador()}
              >
                Agregar
              </Button>
            </div>
          </form>
          {/* <table className="table table-bordered tableContainer">
                <thead>
                  <tr>
                    <th
                      style={{ width: "40%", textAlign: "center" }}
                      scope="col"
                    >
                      Relacionados
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jugadoresRelacionados &&
                    jugadoresRelacionados.map((relacionado) => {
                      return (
                        <tr>
                          <td className="table-data example-text">
                            {relacionado.email}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table> */}
        </div>
      </div>
    </div>
  );
}
