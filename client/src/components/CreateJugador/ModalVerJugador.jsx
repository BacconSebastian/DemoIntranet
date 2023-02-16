import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import agregarIcon from "../../images/agregar-icon.svg";
import { getJugadores, createJugador } from "../../redux/actions/actions";

export default function ModalVerJugador({ jugadoresAgregados }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const initialInput = {
    email: "",
  };
  const jugadores = useSelector((state) => state.jugadores);
  console.log("JUGADORES: ", jugadores);

  const [input, setInput] = useState(initialInput);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getJugadores());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ver más
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {jugadoresAgregados.map((jugador) => {
              return (
                <>
                  <h4 key={jugador.email} value={jugador.email}>
                    {jugador.email}
                  </h4>
                </>
              );
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "45%", textAlign: "center" }} scope="col">
                    Equipo
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
                      FC Barcelona
                    </td>
                  </tr>
                )}
                {jugadoresAgregados.length
                  ? jugadoresAgregados.map((jugador) => {
                      return (
                        <tr key={jugador.equiposAgregados}>
                          <td className="table-data" style={{ paddingTop: 15 }}>
                            {jugador.equiposAgregados[0]}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
